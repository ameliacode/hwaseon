package main

import (
	"os"
	"fmt"
	"log"
	"time"
	"context"
	//"reflect"
	"strconv"
	"strings"
	"encoding/json"
	"github.com/chromedp/chromedp"
	//"github.com/chromedp/cdproto/cdp"
	"github.com/pysrc/bs"
)

type Content struct{
	Title			string			`json:"title"`
	Categories 		[]string		`json:"categories"`
	Link  			string			`json:"link"`
	Store 			string			`json:"store"`
	Shipping		int64			`json:"shipping"`
	Price			int64			`json:"price"`
	PriceShipping	int64			`json:"price_shipping"`
	Sales			int64			`json:"sales"`
	TotalSales		int64			`json:"total_sales"`
}

func checkError(err error) {
	if err != nil {
	  fmt.Println(err)
	  os.Exit(1)
	}
}

func get_price(item *bs.Node) int64 {
	var price string
	for _, output := range item.Sel("span", &map[string]string{"class": "price_num__2WUXn"}){			
		if len(output.Value) > 1 {
			price = output.Value			
		}
	}

	price = strings.Replace(price, "," ,"", -1)
	price = strings.Replace(price, "원" ,"", -1)
	result, _ := strconv.ParseInt(price,10,64)

	return result	
}

func get_shipping(item *bs.Node) int64 {
	var fee string

	for _, output := range item.Sel("em", &map[string]string{"class": "basicList_option__3eF2s"}){			
		if len(output.Value) != 0 {
			fee = output.Value	
			if strings.HasPrefix(fee, "배송비") { break }
		}
	}
	fee = strings.Replace(fee, "<!-- -->","",-1)
	fee = strings.Replace(fee, " ", "", -1)

	if strings.HasPrefix(fee, "배송비") {
		fee = strings.Replace(fee,"배송비","",-1)
		if !strings.HasPrefix(fee,"무료") {
			fee = strings.Replace(fee,"원","",-1)
			fee = strings.Replace(fee,",","",-1)
		}else {
			fee = "0"
		}	 
	} else {
		fee = "-1"
	}
	
	shipping_fee, _ := strconv.ParseInt(fee,10,64)
	return shipping_fee
}

func get_categories(item *bs.Node) []string {
	var categories []string
	for _, output := range item.Sel("a", &map[string]string{"class": "basicList_category__wVevj"}){			
		if len(output.Value) > 0 {
			categories = append(categories, output.Value)
		}
	}
	return categories
}

func first_step(encText string) []Content{
	nShopUrl := fmt.Sprintf(`https://search.shopping.naver.com/search/all?frm=NVSHCHK&origQuery=%s&pagingIndex=1&pagingSize=40&productSet=checkout&query=%s&sort=rel&timestamp=&viewType=list`,encText, encText)
	
	contextVar, cancelFunc := chromedp.NewContext(
		context.Background(),
		chromedp.WithLogf(log.Printf),
	)
	defer cancelFunc()

	contextVar, cancelFunc = context.WithTimeout(contextVar, 10*time.Second)
	defer cancelFunc()

	var html string
	
	err := chromedp.Run(contextVar,
		chromedp.Navigate(nShopUrl),
		chromedp.ScrollIntoView(`footer`),
		chromedp.WaitVisible(`footer`,chromedp.NodeVisible),
		chromedp.OuterHTML(".list_basis", &html),
	)
	if err != nil {
		panic(err)
	}

	soup := bs.Init(html)

	var title string
	var itemsInfo []Content
	var data Content

	for _, item := range soup.SelByTag("li"){
		for _, branch := range item.Sel("a", &map[string]string{"class": "basicList_link__1MaTN"}){		
			if len(branch.Value) != 0 { 
				title = branch.Value
				data.Title = title
				data.Link = (*branch.Attrs)["href"]
				//fmt.Println("title",branch.Value)
			}
		}

		price:= get_price(item)
		if price != 0{
			data.Price = price
			//fmt.Println("price",price)
		}

		categories := get_categories(item)
		if len(categories) > 0 {
			data.Categories = categories
			//fmt.Println("category",categories)
		}

		for _, store := range item.Sel("a", &map[string]string{"class": "basicList_mall__sbVax"}){
			if len(store.Value) != 0 {
				data.Store = store.Value
				//fmt.Println("store",store.Value)
			}
		}

		shipping := get_shipping(item)
		if shipping != -1 {
			data.Shipping = shipping
			//fmt.Println("fee",shipping)	
			//fmt.Println(title, data)
			itemsInfo = append(itemsInfo, data)
			//fmt.Println("--------------------------")
		}
	}	
	return itemsInfo
}

func get_sales(){

}

func second_step(data []Content) []string{

	var dataJson []string

	// contextVar, cancelFunc := chromedp.NewContext(
	// 	context.Background(),
	// 	chromedp.WithLogf(log.Printf),
	// )
	// defer cancelFunc()

	// contextVar, cancelFunc = context.WithTimeout(contextVar, 10*time.Second)
	// defer cancelFunc()
	
	for i := range data {
	// 	var html string
		
	// 	err := chromedp.Run(contextVar,
	// 		chromedp.Navigate(data[i].Link),
	// 		chromedp.WaitVisible(`footer`,chromedp.NodeVisible),
	// 		chromedp.OuterHTML(".list_basis", &html),
	// 	)
	// 	if err != nil {
	// 		panic(err)
	// 	}
		data[i].PriceShipping = data[i].Price + data[i].Shipping
		doc, _ := json.Marshal(data[i])
		dataJson = append(dataJson,string(doc))
	}

	return dataJson	//json array
}

func predict_sales(encText string){
	data := first_step(encText)
	result := second_step(data)
	fmt.Println(result)
}

func main(){
	predict_sales("폼클렌징")
}
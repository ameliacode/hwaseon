package main

import (
	"fmt"
	"log"
	"time"
	"context"
	//"strings"
	"github.com/chromedp/chromedp"
	//"github.com/chromedp/cdproto/cdp"
	//"github.com/aws/aws-lambda-go/lambda"
)


func shop_ranking(encText string) []string{

	nShopUrl := "https://search.shopping.naver.com/search/all?frm=NVSCTAB&origQuery=%s&pagingIndex=%d&pagingSize=40&productSet=total&query=%s&sort=rel&timestamp=&viewType=list"

	contextVar, cancelFunc := chromedp.NewContext(
		context.Background(),
		chromedp.WithLogf(log.Printf),
	)
	defer cancelFunc()

	contextVar, cancelFunc = context.WithTimeout(contextVar, 5*time.Second)
	defer cancelFunc()
	
	var allJsonResult []string
	var data map[string]interface{}

	for i := 1; i <= 10; i++{
		var html string
		err := chromedp.Run(contextVar,
			chromedp.Navigate(fmt.Sprintf(nShopUrl, encText, i, encText)),
			chromedp.InnerHTML(`//*[@id="__NEXT_DATA__"]`, &html),
		)
		if err != nil {
			panic(err)
		}
		
		allJsonResult = append(allJsonResult, html)
	}
	return allJsonResult	
}

func main(){
	shop_ranking("폼클렌징")
}
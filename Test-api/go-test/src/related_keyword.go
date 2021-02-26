package main

import (
	"fmt"
	"log"
	"time"
	"context"
	"strings"
	"github.com/chromedp/chromedp"
	"github.com/chromedp/cdproto/cdp"
	"github.com/aws/aws-lambda-go/lambda"
)

type Content struct{
	naverAuto		[]string		`json:"naver_auto"`
	shopAuto		[]string 		`json:"shop_auto"`
	relKeywd		[]string 		`json:"relkeywd"`
}

func get_shopKwd(encText string) []string{	//네이버 쇼핑자동완성
	shopUrl := fmt.Sprintf("https://search.shopping.naver.com/search/all?where=all&frm=NVSCTAB&query=%s",encText)

	contextVar, cancelFunc := chromedp.NewContext(
		context.Background(),
		chromedp.WithLogf(log.Printf),
	)

	contextVar, cancelFunc = context.WithTimeout(contextVar, 5*time.Second)
	defer cancelFunc()

	var shopAuto  []*cdp.Node
	var shopAutoList	[]string
		
	err := chromedp.Run(contextVar,
		chromedp.Navigate(shopUrl),
		chromedp.Click(`.gnbSearch_inner__1ptdl`, chromedp.NodeVisible),
		chromedp.WaitVisible(`.gnbSearch_inner__1ptdl`, chromedp.NodeVisible),
		chromedp.Nodes(`div.autoComplete_layer_auto__29wPX.autoComplete_active__3O-sR div > div > ul > li`, &shopAuto, chromedp.ByQueryAll),
	)
	if err != nil {
		panic(err)
	}

	const shopSel = `//*[@id="__next"]/div/div[1]/div/div[2]/div/div[2]/form/fieldset/div[1]/div[2]/div[1]/div/ul/li[%d]/a`
	for i := 1; i <= len(shopAuto); i++ {
		var ok bool
		var child string
		if err := chromedp.Run(contextVar,
			chromedp.AttributeValue(fmt.Sprintf(shopSel,i), "data-keyword", &child, &ok),
		); err != nil {
			panic(err)
		}
		//fmt.Println(child)
		shopAutoList = append(shopAutoList, child)
	}
	return shopAutoList
}

func related_keyword(encText string) Content{
	searchUrl := fmt.Sprintf("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%s",encText)

	contextVar, cancelFunc := chromedp.NewContext(
		context.Background(),
		chromedp.WithLogf(log.Printf),
	)
	defer cancelFunc()

	contextVar, cancelFunc = context.WithTimeout(contextVar, 5*time.Second)
	defer cancelFunc()
	
	var relKeywd []*cdp.Node
	var naverAuto []*cdp.Node
	
	var relKeywdList 	[]string
	var naverAutoList 	[]string
	var shopAutoList	[]string
	
	err := chromedp.Run(contextVar,
		chromedp.Navigate(searchUrl),
		chromedp.Nodes(`ul.lst_related_srch > li`, &relKeywd, chromedp.ByQueryAll),
		chromedp.Click(`.greenbox`, chromedp.NodeVisible),
		chromedp.WaitVisible(`.greenbox`, chromedp.NodeVisible),
		chromedp.Nodes(`ul.kwd_lst._kwd_list > li`, &naverAuto, chromedp.ByQueryAll),
	)
	if err != nil {
		panic(err)
	}
	
	// 연관검색어
	const relSel = `//*[@id="nx_footer_related_keywords"]/div/div[2]/ul/li[%d]/a/div`
	for i := 1; i <= len(relKeywd); i++ {
		var child string
		if err := chromedp.Run(contextVar,
			chromedp.Text(fmt.Sprintf(relSel, i), &child),
		); err != nil {
			panic(err)
		}
		relKeywdList = append(relKeywdList, child)
	}
	
	// 네이버 자동완성
	const navSel = `//*[@id="nx_autoframe_top"]/div/div[2]/div[1]/ul/li[%d]`
	for i := 1; i <= len(naverAuto); i++ {
		var child string
		if err := chromedp.Run(contextVar,
			chromedp.Text(fmt.Sprintf(navSel, i), &child),
		); err != nil {
			panic(err)
		}
		child = strings.Replace(child, "\n추가" ,"", -1)
		naverAutoList = append(naverAutoList, child)
	}

	//네이버 쇼핑자동완성
	shopAutoList = get_shopKwd(encText)

	return Content{
		naverAuto: naverAutoList,
		shopAuto: shopAutoList,
		relKeywd: relKeywdList,
	}
}

func main(){
	lambda.Start(HandleLambdaEvent)
}
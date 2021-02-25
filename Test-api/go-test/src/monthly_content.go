package main

import (
	"fmt"
    "log"
	"strings"
	"strconv"
    "time"
	"context"
	"reflect"
	"encoding/json"
	//"io/ioutil"
	"os/exec"

	"github.com/chromedp/chromedp"

)

type Content struct {
	Blog 		int64		`json:"blog"`
	Cafe		int64		`json:"cafe"`
	Total		int64		`json:"total"`
	PrevMonth	int64		`json:"prevMonth"`
}

func monthly_blog(encText, startDate, endDate string) string {
	
	blog_url := fmt.Sprintf("https://section.blog.naver.com/Search/Post.nhn"+"?pageNo=1"+"&rangeType=MONTH"+"&orderBy=sim"+"&startDate="+startDate+"&endDate="+endDate+"&keyword="+encText)
	
	contextVar, cancelFunc := chromedp.NewContext(
		context.Background(),
		chromedp.WithLogf(log.Printf),
	)

	defer cancelFunc()

	contextVar, cancelFunc = context.WithTimeout(contextVar, 10*time.Second)
	defer cancelFunc()

	var strVar string

	err := chromedp.Run(contextVar,
		chromedp.Navigate(blog_url),
		chromedp.Sleep(time.Second * 1),
		chromedp.InnerHTML(`span > em.search_number`, &strVar),
	)
	if err != nil {
		panic(err)
	}

	return strings.Replace(strVar[:len(strVar)-3], "," ,"", -1)
}

func monthly_cafe(encText string) string {

	cafe_url := fmt.Sprintf("https://cafe.naver.com/ca-fe/home/search/articles"+"?q="+encText+"&pr=3")
	
	contextVar, cancelFunc := chromedp.NewContext(
		context.Background(),
		chromedp.WithLogf(log.Printf),
	)

	defer cancelFunc()

	contextVar, cancelFunc = context.WithTimeout(contextVar, 10*time.Second)
	defer cancelFunc()

	var strVar string

	err := chromedp.Run(contextVar,
		chromedp.Navigate(cafe_url),
		chromedp.Click(`#app`, chromedp.NodeVisible),
		chromedp.WaitVisible(`#app`),
		chromedp.Sleep(time.Second * 1),
		chromedp.InnerHTML(`p > span.total_count`, &strVar),
	)
	if err != nil {
		panic(err)
	}

	return strings.Replace(strVar[:len(strVar)-3], "," ,"", -1)
}

func pycall_ratiosum(encText, timeUnit string) float64 {
	strCmd := "import get_ratiosum; print(get_ratiosum.get_ratiosum('"+encText+"','date'))"
	cmd := exec.Command("python",  "-c", strCmd)
    out, err := cmd.CombinedOutput()
    if err != nil { 
		panic(err) 
	}

	result, err := strconv.ParseFloat(string(out)[:len(out)-2],64)
	if err!= nil { 
		panic(err)
	} 

	return result
}

func monthly_content(encText string){

	var format string = "2006-01-02 15:04:05"
	var convMonths int = 1

	now := time.Now()
	month_ago := now.AddDate(0,-convMonths,0).Format(format)

	var startDate string = month_ago[:10] 
	var endDate string = now.String()[:10]

	blog_output := monthly_blog(encText, startDate,endDate)
	blog_num, _:= strconv.ParseInt(blog_output,10,64)

	cafe_output := monthly_cafe(encText)
	cafe_num, _ := strconv.ParseInt(cafe_output,10,64)

	total_num := cafe_num + blog_num

	ratio_sum := pycall_ratiosum(encText, "date")
	prev_month := int64(float64(total_num) / ratio_sum)

	fmt.Println(blog_num, cafe_output, total_num, prev_month)

	data := make([]Content,1)

	data[0].Blog = blog_num
	data[0].Cafe = cafe_num
	data[0].Total = total_num
	data[0].PrevMonth = prev_month

	doc,_ := json.Marshal(data)
	fmt.Println(reflect.TypeOf(doc))
	fmt.Println(string(doc))
}


func main(){
	fmt.Println(time.Now())
	encText := "요구르트"
    monthly_content(encText)
	fmt.Println(time.Now())
}
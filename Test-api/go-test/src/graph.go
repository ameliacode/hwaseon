package main

import (
    "bytes"
    "fmt"
    "io/ioutil"
    "net/http"
    //"net/url"
	"encoding/json"
    //"strconv"
)

type keywordGroup struct {
	groupName 	string		`json:"groupName"`
	keywords	[]string	`json:"keywords"`
}

func handleDatalab() {

	var ClientID	 string = "0AyAyRj8YChF_BiC3iia"
	var	ClientSecret string = "G8eq5Uax1T"

	kwdGroup := make([]keywordGroup,1)
	kwdGroup[0].groupName = "폼클렌징"
	kwdGroup[0].keywords = []string{"폼클렌징"}
	doc, _ := json.Marshal(kwdGroup)

	buff := bytes.NewBuffer(doc)

	req, err := http.NewRequest("POST","https://openapi.naver.com/v1/datalab/search", buff)
	if err != nil{
		panic(err)
	}

	req.Header.Add("Content-Type","application/json")
	req.Header.Add("X-Naver-Client-Id",ClientID)
	req.Header.Add("X-Naver-Client-Secret", ClientSecret)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil{
		panic(err)
	}
		
	defer resp.Body.Close()

	respBody, err := ioutil.ReadAll(resp.Body)
	if err == nil {
		str := string(respBody)
		fmt.Println(str)
	}
}


func main(){
	handleDatalab() 
}
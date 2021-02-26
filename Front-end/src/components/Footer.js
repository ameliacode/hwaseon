import React from "react";
import "./Footer.css"

const Footer = () => {
    return (
    <div className = "main-footer">
        <div className = "container">
            <div className = "row">
                <ul className = "li">
                    <hr/>
                    <li>
                        (주)화선기획 | 사업자 등록번호 : 726-81-01774  | 통신판매신고번호 : 제 2020-서울마포-1174호 | 서울특별시 마포구 독막로 6길 9, 2층 2173호
                    </li>
                    <li>
                        (주)화선양행 | 사업자 등록번호 : 666-88-01919  | 통신판매신고번호 : 제 2021-서울서초-0123호 | 서울특별시 서초구 반포대로22길 35 (서현빌딩) 서현빌딩 2067호
                    </li>
                    <li>
                        대표자 : 민기태 | 문의 : cs@hwaseon.com 
                    </li>
                </ul>
            </div>
        </div>
    </div>);
}

export default Footer;
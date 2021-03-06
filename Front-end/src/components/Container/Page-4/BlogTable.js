import React from "react"; 
import PropTypes from "prop-types"; 
import { AgGridColumn, AgGridReact } from 'ag-grid-react';


function BlogTable({data, title, keyword, rank, total_rank, monthly_search, monthly_content }) 
{ 
    return (
        <div className="blog-table">
            <AgGridReact
                rowData={data}>
                <AgGridColumn field="글 제목 ▲">{title}</AgGridColumn>
                <AgGridColumn field="키워드 ▲">{keyword}</AgGridColumn>
                <AgGridColumn field="View 순위 ▲">{rank}</AgGridColumn>
            </AgGridReact>
        </div> 
    ) 
}; 

BlogTable.propTypes = {
    title: PropTypes.string.isRequired, 
    keyword: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired, 
    total_rank: PropTypes.number.isRequired, 
    monthly_search: PropTypes.number.isRequired,   
    monthly_content: PropTypes.number.isRequired, 
}; 
    
export default BlogTable;


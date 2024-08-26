import React from 'react';

function Pagination({currentPage, totalPage, changePage}) {

    let pages = []
    for(let i = 1; i <= totalPage; i++){
        pages.push(i)
    }

    return (
        <div className="pagination">
            <ul>
                {
                    pages.map((i)=>{
                        return (i !== parseInt(currentPage)) ? <li key={i} onClick={() => changePage(i)}><span>{i}</span></li> : <li key={i} className="active"><span>{i}</span></li>
                    })
                }
            </ul>
        </div>
    );
}

export default Pagination;
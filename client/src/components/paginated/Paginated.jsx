import React from 'react';
import './paginated.css'

export default function Paginated({
  totalCountriesAll,
  countriesXPage,
  pagination,
  nextPage,
  prevPage,
  currentPage,
}) {
  const pages = [];

  // console.log('este es paginado', totalCountriesAll);

  const totalPages = Math.ceil(totalCountriesAll.length / countriesXPage);
  const maxButtons = (() => {
    if (totalPages > 10) {
      if (currentPage + 5 >= totalPages) {
        return totalPages + 1;
      } else {
        if (currentPage < 6) {
          return 11;
        } else {
          return currentPage + 5;
        }
      }
    } else {
      return totalPages;
    }
  })();
  const initButton = (() => {
    if (totalPages > 10) {
      if (currentPage > 6) {
        if (currentPage + 5 < totalPages) {
          return currentPage - 5;
        } else {
          return totalPages - 9;
        }
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  })();
  console.log(initButton);

  //si totalPages es 10 o mayor y currentPage es 5 o mayor init seria 1 si currentPage es mayor a 5
  //si currentPage es mayor a 1

  for (let i = initButton; i < maxButtons; i++) {
    pages.push(i);
  }

  return (
    <div className="pages_container">
      <div className="label_current_page">
        Página: <div className="current_page_label">{currentPage}</div>
      </div>
      <div className="label_current_page">
        De: <div className="current_page_label">{totalPages}</div>
      </div>
      <ul className="ul_container">
        <li className="boton_paginado" onClick={() => prevPage()}>
          <button className="btn_prev_next">Anterior</button>
        </li>
        {pages ? (
          pages.map((page) => (
            <li className="boton_paginado" key={page}>
              <button className={currentPage === page ? 'btn_primary_active' : 'btn_primary'} onClick={() => pagination(page)} value={page}>
                {page}
              </button>
            </li>
          ))
        ) : (
          <li></li>
        )}
        <li className="boton_paginado" onClick={() => nextPage()}>
          <button className="btn_prev_next">Seguiente</button>
        </li>
      </ul>
    </div>
  );
}
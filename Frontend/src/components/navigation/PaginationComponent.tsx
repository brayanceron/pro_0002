
function PaginationComponent({ limit, page, totalResults, numbersOfOptions = 5, setPage }: { limit: number, page: number, totalResults: number, numbersOfOptions: number, setPage: (newValue: number) => void }) {
    //TODO validate numberOfOptions must be greater than 2
    const tabs = Math.ceil(totalResults / limit); //TODO validate when tabs is small, 1,2 or 3 tabs
    const listTabs = [];
    for (let i = -(numbersOfOptions - 1); i <= numbersOfOptions; i++) {
        const tabToCreate = page + i;
        if (tabToCreate < 1 || tabToCreate > tabs) { continue; }
        if (listTabs.length > numbersOfOptions) break;
        listTabs.push(tabToCreate);
    }
    listTabs.sort((a, b) => a - b) // it sort tabs

    if (totalResults < limit) return <></>
    return (
        <nav className="flex items-center gap-x-1">
            <button type="button" onClick={_ => setPage(page - 1)} className="btn btn-soft max-sm:btn-square">
                <span className="icon-[tabler--chevron-left] size-5 rtl:rotate-180 sm:hidden"></span>
                <span className="hidden sm:inline">Previous</span>
            </button>
            <div className="flex items-center gap-x-1">

                {!listTabs.includes(1) && <SidaPage page={1} setPage={setPage} />}

                {
                    listTabs.map(item => {
                        return (
                            <button
                                onClick={_ => setPage(item)}
                                type="button"
                                aria-current={item == page ? "page" : "false"}
                                className="btn btn-soft btn-square aria-[current='page']:text-bg-soft-primary"
                            >
                                {item}
                            </button>);
                    })
                }

                {!listTabs.includes(tabs) && <SidaPage page={tabs} setPage={setPage} />}

            </div>
            <button onClick={_ => setPage(page + 1)} type="button" className="btn btn-soft max-sm:btn-square">
                <span className="hidden sm:inline">Next</span>
                <span className="icon-[tabler--chevron-right] size-5 rtl:rotate-180 sm:hidden"></span>
            </button>
        </nav>
    );
}


const SidaPage = ({ page, setPage }: { page: number, setPage: (newValue: number) => void }) => {
    return (
        <>
            {
                page == 1 &&
                <button onClick={_ => setPage(page)} type="button" className="btn btn-soft btn-square aria-[current='page']:text-bg-soft-primary">
                    {page}
                </button>
            }


            {/* <!-- tooltip --> */}
            <div className="tooltip inline-block">
                <button type="button" className="tooltip-toggle tooltip-toggle btn btn-soft btn-square group" aria-label="More Pages">
                    <span className="icon-[tabler--dots] size-5 group-hover:hidden"></span>
                    <span className="icon-[tabler--chevrons-left] hidden size-5 flex-shrink-0 group-hover:block"></span>
                    <span className="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible" role="tooltip">
                        <span className="tooltip-body">{page} pages</span>
                    </span>
                </button>
            </div>
            {/* <!-- tooltip end --> */}

            {
                page != 1 &&
                <button onClick={_ => setPage(page)} type="button" className="btn btn-soft btn-square aria-[current='page']:text-bg-soft-primary">
                    {page}
                </button>
            }

        </>
    );
}

export { PaginationComponent }
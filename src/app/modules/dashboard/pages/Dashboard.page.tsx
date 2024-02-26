import React
// ,
//  { useState,useEffect }
  from 'react'
import Pagelayout from '@layout/PageLayout'
// import styles from './DashboardPage.module.css'
// import useMediaQuery from '@mui/material/useMediaQuery'
// import CommonHeaderComponent from '@shared/components/CommonHeaderComponent/CommonHeaderComponent'
// import { NimbleDataGrid } from 'nimble-design-system'
// import addtask from '@assets/images/OverviewTab/AddTask.svg'
// import RenderCard from './component/renderCard/RenderCard'
const DashboardPage: React.FC = () => {
    // const matches = useMediaQuery('(max-width:600px)')
    // const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:960px)')
    // const [selectedFilters, setSelectedFilters] = useState({})
    // const [searchKey , setSearchKey] = useState("")
    // const [pageNo , setPageNo]= useState(1)
    // const handlePageChange = (newPageNumber:any):void => {
    //   console.log("USER CHANGED PAGE" , newPageNumber)
      
    // };
    // const handleCustomPagination =(value:any):void=>{
    //   console.log("Custom Pagination Selected", value)

    // }
    // const handleChangeFilters  =(filterValues:any):void =>  {
    //     setSelectedFilters(filterValues)
    //     console.log('Selected filter values:', filterValues)
    // }
    // const searchHandler = (e:string):void=>{
    //   setSearchKey(e)
    // }

    // useEffect(() => {
    //   console.log('User searched', searchKey);
    //   console.log('Selected filters have changed:', selectedFilters);
      
    // }, [selectedFilters,searchKey]); 
    return (
        <Pagelayout>
            {/* <div
                className={`${styles.common_header_component_container} ${matches ? styles.AddPadding : ''} ${
                    isMediumScreen ? styles.TopMargin : ''
                }`}
            >
                <CommonHeaderComponent
                    heading="Overview of"
                    para="Overview of my tasks"
                    goBackImg=""
                    goBackText=""
                    goBackClickHandler={() => {}}
                />
            </div> */}
            <br />
            {/* <NimbleDataGrid
                clickCustomPagination={handleCustomPagination}
                data={[
                    {
                        deadline: '2023-09-02',
                        status: 'To do',
                        taskName: 'Scedule start meeting',
                        taskOwner: 'Member Advisors',
                        topicName: 'Ferus smit',
                    },
                    {
                        deadline: '2023-08-31',
                        status: 'In progress',
                        taskName: 'Scedule start planning',
                        taskOwner: 'Manoj Gamachchige',
                        topicName: 'Nimble',
                    },
                    {
                        deadline: '2023-09-01',
                        status: 'Done',
                        taskName: 'Project Planning',
                        taskOwner: 'Astrid',
                        topicName: 'Nimble',
                    },
                    {
                        deadline: '2023-10-02',
                        status: 'To do',
                        taskName: 'Scedule budget meeting',
                        taskOwner: 'Max.L',
                        topicName: 'NSL',
                    },
                ]}
                filterPanalData={[
                    {
                        dataPoint: 'taskName',
                        name: 'Task Name',
                    },
                    {
                        dataPoint: 'topicName',
                        name: 'Topic Name',
                    },
                    {
                        customFilterData: [
                            {
                                label: "Todo",
                                value: 'todo',
                            },
                            {
                                label: 'InProgress',
                                value: 'inProgress',
                            },
                            {
                                label: 'Done',
                                value: 'done',
                            },
                            {
                                label: 'Expired',
                                value: 'expired',
                            },
                        ],
                        dataPoint: 'status',
                        name: 'Status',
                    },
                    {
                        dataPoint: 'deadline',
                        name: 'Deadline',
                    },
                    {
                        dataPoint: 'taskOwner',
                        name: 'Task owner',
                    },
                ]}
                header="Tasks"
                height="100vh"
                // onChangeFilters={function noRefCheck(){}}
                onChangeFilters={handleChangeFilters}
                onClickDataCard={function noRefCheck() {}}
                onSearchHandler={searchHandler}
                paginationData={{
                    onPageChnage: (event,value)=>{setPageNo(value)},
                    page: pageNo,
                    totalPage: 100,
                }}
                primaryActionProps={{
                    label: 'Add Tasks',
                    onClick: function noRefCheck() {},
                    size: 'small',
                    startIcon: <img src={addtask} />,
                    variant: 'contained',
                }}
                renderCard={(item: any) => <RenderCard item={item} />}
                width="380px"
            /> */}

           
        </Pagelayout>
    )
} 

export default DashboardPage

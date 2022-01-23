import {useEffect, useState} from "react";
import surveyService from "../../services/Survey";
import {Button, Typography} from '@mui/material';
import DataTable from "react-data-table-component";
import { Box, Tooltip } from "@mui/material";
import history from "../../utils/history";
import "./style.scss";


const Survey = () => {


    const [pageNo, setPageNo] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [surveyList,setSurveyList] = useState([]);
    const [isDataApiCalled, setIsDataApiCalled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const surveyColumns = [
        {
            name: "Survey Title",
            selector: (row: any) => row?.title,
        },
        {
            name: "Is Active",
            selector: (row: any) => {
                return(
                    row?.is_active ? "True": "False"
                )
            },
        },
        {
            name: "Response Count",
            selector: (row: any) => row?.response_count,
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <Box className="tableButtons">
                    <Tooltip title="Give a survey">
                        <Button
                            onClick={() => history.push(`/survey-detail/${row.id}`)}
                            color={"primary"}
                            disabled={!row?.is_active}
                        >
                            Take this Survey
                        </Button>
                    </Tooltip>
                </Box>
            ),
        },
    ];


    const getSurveys = (params?: any) => {
        setIsLoading(true);
        surveyService.getSurveys(params).then((response:any)=>{
                setSurveyList(response.results);
                setTotalRows(response.count);
                setIsLoading(false);
            })
            .catch((error: any) => {
                setIsLoading(false);
            });
    };

    // useEffect(() => {
    //     if (!isDataApiCalled) {
    //         setIsDataApiCalled(true);
    //         let obj = {
    //             offset: 0,
    //             limit: 5,
    //         };
    //         getSurveys(obj);
    //     }
    // }, [isDataApiCalled]);



    const reloadData = (pageNumber: number) => {
        console.log(pageNo)
        let obj = {
            offset: (pageNumber - 1) * rowsPerPage,
            limit: rowsPerPage,
        };
        getSurveys(obj);
    };

    const changePage = (page: number, totalRows: number) => {
        setPageNo(page);
        reloadData(page);
    };

    const changeRowsPerPage = (
        currentRowsPerPage: number,
        currentPage: number
    ) => {
        let obj = {
            offset: (currentPage - 1) * currentRowsPerPage,
            limit: currentRowsPerPage,
        };
        getSurveys(obj);
        setRowsPerPage(currentRowsPerPage);
    };

    return (
        <div className={"survey"}>
            <Typography className={"title"}>
                A survey is a research method used for collecting data from a predefined group of respondents to gain information and insights into various topics of interest.
            </Typography>

            <Box className={"table"}>
                {/*<DataTable*/}
                {/*    pagination*/}
                {/*    progressPending={isLoading}*/}
                {/*    theme={"dark"}*/}
                {/*    fixedHeader={true}*/}
                {/*    columns={surveyColumns}*/}
                {/*    data={surveyList}*/}
                {/*    selectableRows={false}*/}
                {/*    paginationServer={true}*/}
                {/*    onChangePage={changePage}*/}
                {/*    paginationTotalRows={totalRows}*/}
                {/*    responsive={true}*/}
                {/*    paginationPerPage={5}*/}
                {/*    onChangeRowsPerPage={changeRowsPerPage}*/}
                {/*    paginationComponentOptions={{ noRowsPerPage: false }}*/}
                {/*    paginationRowsPerPageOptions={[5, 10, 15, 20]}*/}
                {/*/>*/}
            </Box>
        </div>
    )
};

export default Survey;

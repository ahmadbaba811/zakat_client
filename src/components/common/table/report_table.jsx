import MUIDataTable from "mui-datatables";
import React, { useRef } from "react";
import { formatDateAndTime, projectLogo } from "../../../constants/constants";
import ReactToPrint from "react-to-print";
import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@mui/icons-material/Print";
import "./report_table.css";
// import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';



function ReportTable(props) {
    let componentRef = useRef();

    const options = {
        rowsPerPageOptions: [5, 10, 20, 50, 100, 200, 500, 1000],
        search: true,
        download: true,
        print: false,
        viewColumns: true,
        fixedHeader: false,
        filter: true,
        selectableRows: 'none',
        filterType: "dropdown",
        responsive: "standard",
        pagination: typeof props.pagination !== 'undefined' ? props.pagination : true,
        tableBodyHeight: typeof props.height !== 'undefined' ? props.height : '500px',
        downloadOptions: {
            filename: `${!props.title ? "" : props.title}-${formatDateAndTime(new Date(), 'date_and_time')}.csv`,
            separator: ','
        },
        draggableColumns: {
            enabled: true,
            transitionTime: 300
        },
        
        searchPlaceholder: 'Search table',
        customToolbar: () => {
            return (
                <ReactToPrint
                    trigger={() => <IconButton ><PrintIcon /></IconButton>}
                    content={() => componentRef}
                />
            );
        }
    };

    const theme = createTheme({
        palette:{
            type:'dark'
        },
        typography: {
            fontSize: 9
          },
    })
    return (
        <>
            <div style={{ width: `100%` }} ref={(el) => (componentRef = el)}>
                <div className="text-center bg-secondary print-only">
                    <img src={projectLogo} alt="Project" height="100px" />
                    <h1>{!props.title ? "" : props.title}</h1>
                    <h4>{formatDateAndTime(new Date(), 'date_and_time')}</h4>
                </div>
                <ThemeProvider theme={theme}>
                    <MUIDataTable
                        title={props.title}
                        data={props.data}
                        columns={props.columns}
                        options={options}
                    />

                </ThemeProvider>

            </div>

        </>
    );
}

export default ReportTable;

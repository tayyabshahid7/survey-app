import React, {useEffect} from "react";
import { Router } from 'react-router-dom';
import PublicRoute from "./PublicRoute";
import history from "../utils/history";
import Survey from "../pages/Survey";
import SurveyDetail from "../pages/SurveyDetail";

const Route = () => {

    useEffect(()=>{
        // @ts-ignore
        if(window.location.pathname === "/"){
            history.push("/survey");
        }
    });

  return (
    <Router history={history}>
        <PublicRoute component={Survey} path="/survey" exact />
        <PublicRoute component={SurveyDetail} path="/survey-detail/:id" exact />
    </Router>
  );
};

export default Route;

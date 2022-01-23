import {useCallback, useEffect, useState} from "react";
import surveyService from "../../services/Survey";
import {
    Button,
    Card,
    CardActions,
    CardContent, FormControl,
    FormControlLabel, FormLabel,
    Radio, RadioGroup,
    TextField,
    Typography
} from '@mui/material';
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import "./style.scss";
import {isValid, showAlert} from "../../utils/helper";
import history from "../../utils/history";


const SurveyDetail = () => {

    let params: any = useParams();
    const [surveyList,setSurveyList] = useState<any>([]);
    const [optionList,setOptionList] = useState<any>([]);
    const [allNotSelected,setAllNotSelected] = useState<boolean>(false);
    const [isDataApiCalled, setIsDataApiCalled] = useState(false);

    const [email, setEmail] = useState({ isInvalid: false, value: "", err: "" });

    const handleEmail = (e: any) => {
        setEmail({ isInvalid: false, value: e.currentTarget.value, err: "" });
    };

    const getSurveyDetail = useCallback(() => {
        surveyService.getSurveyDetail(params['id']).then((response:any)=>{
            setSurveyList(response);
        })
        .catch((error: any) => {

        });
    },[params]);

    useEffect(() => {
        if (!isDataApiCalled) {
            setIsDataApiCalled(true);
            getSurveyDetail();
        }
    }, [isDataApiCalled,getSurveyDetail]);


    const validate = () => {
        let isValidForm = true;

        if (email.value === "") {
            let err = "Email is required !";
            setEmail({ isInvalid: true, value: email.value, err: err });
            isValidForm = false;
        } else {
            const errors = isValid(email.value, { email: true });
            if (errors.length) {
                setEmail({ isInvalid: true, value: email.value, err: errors[0] });
                isValidForm = false;
            }
        }

        if(optionList.length < surveyList.questions.length){
            isValidForm = false;
            setAllNotSelected(true)
        }else{
            setAllNotSelected(false)
        }
        return isValidForm;
    }

    const submit = () => {
        if(validate()){
            let option:any = [];
            optionList.forEach((item:any)=>{
                option.push(item.option_id);
            });
            let obj = {
                survey: params["id"],
                email: email.value,
                option:option
            }
            surveyService.submitSurvey(obj).then((response:any)=>{
                showAlert(response.response, "success");
                history.push("/survey")
            }).catch((error: any) => {
                showAlert(error.error, "error");
            });
        }
    }

    const handleRadioChange = (event:any,question:any) => {
        const answer = [...optionList];
        let obj = {
            question_id: question.id,
            option_id: event.target.value
        }
        let index = answer.findIndex((item:any)=> item.question_id === question.id);
        if(index>-1){
            answer[index] = obj;
        }else{
            answer.push(obj);
        }
        setOptionList(answer);
    };


    return (
        <div className={"survey-detail"}>
            <Button onClick={()=>{history.push("/survey")}} className={"back-btn"} size="large">Go Back</Button>

            <Typography className={"title"}>
                A survey is a research method used for collecting data from a predefined group of respondents to gain information and insights into various topics of interest.
            </Typography>

            <Card sx={{ width: "100%" }} style={{marginTop:"3%"}}>
                <CardContent>
                    <Box>
                        <TextField
                            style={{width:"50%"}}
                            id="outlined-name"
                            label="Email"
                            value={email.value}
                            onChange={handleEmail}
                        />
                        {email.isInvalid && (
                            <Box fontSize="12" mt={"15px"} lineHeight="12px" color="red">
                                {email.err}
                            </Box>
                        )}
                    </Box>
                    <Box className={"question-list"}>
                        {Object.keys(surveyList).length >0 && surveyList?.questions.map((question:any,index:number)=>{
                            return(
                                <FormControl key={index} component="fieldset" style={{marginTop:"2%"}}>
                                    <FormLabel component="legend" className={"question-title"}>{question.question_title}</FormLabel>
                                    <RadioGroup onChange={(e)=>{handleRadioChange(e,question)}}  aria-label={question.question_title} name={question.question_title} >
                                        {question.choices.map((choice:any,answerIndex:number)=>{
                                            return(
                                                <FormControlLabel key={answerIndex} value={choice.id} control={<Radio />} label={choice.text} />
                                            )
                                        })}
                                    </RadioGroup>
                                </FormControl>
                            )
                        })}
                        {allNotSelected && (
                            <Box fontSize="12" mt={"15px"} lineHeight="12px" color="red">
                                Please select all the options
                            </Box>
                        )}
                    </Box>
                </CardContent>
                <CardActions>
                    <Button onClick={submit} className={"btn-submit"} size="large">Submit</Button>
                </CardActions>
            </Card>
        </div>
    )
};

export default SurveyDetail;

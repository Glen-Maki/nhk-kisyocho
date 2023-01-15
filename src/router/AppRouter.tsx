import {ReactNode} from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import {SetTimer} from "../page/SetTimer";
import {StopTimer} from "../page/StopTimer";

export const AppRouter = ({children}: {
    children: ReactNode
}) => {
    return (
        <BrowserRouter>
            {children}
            <Route path={'setting'} element={<SetTimer/>}/>
            <Route path={'stop-timer'} element={<StopTimer/>}/>
        </BrowserRouter>
    )
}
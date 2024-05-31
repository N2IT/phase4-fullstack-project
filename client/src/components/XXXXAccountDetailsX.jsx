import { AgentContext } from "../AgentProvider";
import { useContext } from "react";

const AccountDetails = () => { 

    const {account, isLoading} = useContext(AgentContext);
    return (
        <>
            {isLoading ? <h2>Loading...</h2> :
                <ul>
                    <li><b>account_number:</b> {account.account_number}</li>
                    <li><b>company_name:</b> {account.company_name}</li>
                    <li><b>address_1:</b> {account.address_1}</li>
                    <li><b>address_2:</b> {account.address_2}</li>
                    <li><b>city:</b> {account.city}</li>
                    <li><b>state:</b> {account.state}</li>
                    <li><b>zip_code:</b> {account.zip_code}</li>
                    <li><b>phone:</b> {account.phone}</li>
                    <li><b>discount:</b> {account.discount}</li>
                    <li><b>markup_variable:</b> {account.markup_variable}</li>
                    <li><b>created_at:</b> {account.created_at}</li>
                    <li><b>updated_at:</b> {account.updated_at}</li>
                    <li><b>status:</b> {true}</li>
                    
                </ul>
            }
        </>

    )
}

export default AccountDetails
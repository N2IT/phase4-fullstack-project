import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../../AgentProvider';

const CreateNewConfiguration = () => {

    const { agent, setConfiguration, errors, setErrors, quote, navigate, onSubmitNewQuoteForm } = useContext(AgentContext);

    const formSchema = yup.object().shape({
        project_name: yup.string(),
        unit_name: yup.string(),
        complete_unit: yup.string(),
        housing: yup.string(),
        side_track: yup.string(),
        hem_bar: yup.string(),
        fabric: yup.string(),
        motor_tube: yup.string(),
        motor_side: yup.string(),
        power_chord: yup.string(),
        motor_charge: yup.string(),
        tube_charge: yup.string(),
        housing_charge: yup.string(),
        retention_type: yup.string(),
        retention_cap_color: yup.string(),
        // left_retention: yup.string(),
        // right_retention: yup.string(),
        tracks_exact_length: yup.string(),
        tracks_charge: yup.string(),
        hem_bar_type: yup.string(),
        hem_cap_color: yup.string(),
        pile_brush_style: yup.string(),
        hem_bar_charge: yup.string(),
        fabric_type: yup.string(),
        fabric_selection: yup.string(),
        // seam_location: yup.string(),
        // seam_location_num: yup.string(),
        zipper_color: yup.string(),
        // usable_fabric_width: yup.string(),
        // rotate_fabric: yup.string(),
        fabric_charge: yup.string(),
        color_collection: yup.string(),
        frame_color: yup.string(),
        // powder_charge: yup.string(),
        list_price: yup.string(),
        quote_id: yup.string(),
    })

    const formik = useFormik({
        initialValues: {
            project_name: "",
            unit_name: "",
            complete_unit: "true",
            housing: "true",
            side_track: "true",
            hem_bar: "true",
            fabric: "true",
            motor_tube: "",
            motor_side: "",
            power_chord: "",
            motor_charge: 0,
            tube_charge: 0,
            housing_charge: 0,
            retention_type: "",
            retention_cap_color: "",
            // left_retention: "",
            // right_retention: "",
            tracks_exact_length: "",
            tracks_charge: 0,
            hem_bar_type: "",
            hem_cap_color: "",
            pile_brush_style: "",
            hem_bar_charge: 0,
            fabric_type: "",
            fabric_selection: "",
            seam_location: "",
            seam_location_num: "",
            zipper_color: "",
            // usable_fabric_width: "",
            // rotate_fabric: "",
            fabric_charge: 0,
            color_collection: "",
            frame_color: "",
            // powder_charge: 0,
            list_price: 0,
            quote_id: `${quote.id}`,
            created_by: `${agent.id}`,
            status: true,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/configurations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((r) => r.json())
                .then((data) => {
                    {
                        data.errors ? setErrors(data.errors) :
                            setConfiguration(data),
                            onSubmitNewQuoteForm(),
                            // navigate(`/quotes/${quote.id}`),
                            alert(`Configuration ${data.id} has been successfully created.`)
                    }
                })
        }
    })

    return (
        <>
            <div className="account-details">
                <h2>Configure your product:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="project_name">Project Name </label>
                    <input
                        id="project_name"
                        name="project_name"
                        onChange={formik.handleChange}
                        value={formik.values.project_name}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.sku}</p>
                    <label htmlFor="unit_name">Unit Name </label>
                    <input
                        id="unit_name"
                        name="unit_name"
                        onChange={formik.handleChange}
                        value={formik.values.unit_name}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.unit_name}</p>
                    <label htmlFor="complete_unit">Complete Unit </label>
                    <input
                        type="radio"
                        id="complete_unit"
                        name="complete_unit"
                        onChange={formik.handleChange}
                        value={formik.values.complete_unit}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.complete_unit} </p>
                    <label htmlFor="housing">Housing </label>
                    <input
                        type="radio"
                        id="housing"
                        name="housing"
                        onChange={formik.handleChange}
                        value={formik.values.housing}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.housing} </p>
                    <label htmlFor="quote_id">Quote Id </label>
                    <input
                        id="quote_id"
                        name="quote_id"
                        onChange={formik.handleChange}
                        value={formik.values.quote_id}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.quote_id} </p>
                    <label htmlFor="created_by">Created By </label>
                    <input
                        id="created_by"
                        name="created_by"
                        onChange={formik.handleChange}
                        value={formik.values.created_by}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
                    <label htmlFor="status">Status </label>
                    <input
                        id="status"
                        name="status"
                        onChange={formik.handleChange}
                        value={formik.values.status}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.status} </p>
                    <label htmlFor="list_price">Total Price </label>
                    <input
                        id="list_price"
                        name="list_price"
                        onChange={formik.handleChange}
                        value={formik.values.list_price}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.list_price} </p>
                    <button type="submit">Submit</button>
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </div>
        </>
    )
}

export default CreateNewConfiguration
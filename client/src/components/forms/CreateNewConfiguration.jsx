// import React, { useContext } from 'react';
// import { useFormik } from 'formik';
// import * as yup from "yup";
// import { AgentContext } from '../../AgentProvider';

// const CreateNewConfiguration = () => {

//     const { agent, setConfiguration, errors, setErrors, quote, navigate, onSubmitNewQuoteForm } = useContext(AgentContext);

//     const formSchema = yup.object().shape({
//         sku: yup.string().required("Please enter the sku for the product to quote"),
//         product_title: yup.string().required("Please provide product title"),
//         product_description: yup.string().required('Please enter a product description'),
//         cost: yup.string().required('Please enter the product cost'),
//     })

//     const formik = useFormik({
//         initialValues: {
//             sku: "",
//             product_title: "",
//             product_description: "",
//             cost: "",
//             quote_id: `${quote.id}`,
//             created_by: `${agent.id}`,
//             status: true,
//         },
//         validationSchema: formSchema,
//         onSubmit: (values) => {
//             fetch("/api/configurations", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(values),
//             })
//                 .then((r) => r.json())
//                 .then((data) => {
//                     {
//                         data.errors ? setErrors(data.errors) :
//                             setConfiguration(data),
//                             onSubmitNewQuoteForm(),
//                             navigate(`/quotes/${quote.id}`),
//                             alert(`Configuration ${data.id} has been successfully created.`)
//                     }

//                 })
//         }
//     })

//     return (
//         <>
//             <div className="account-details">
//                 <h2>Configure your product:</h2>
//                 <form onSubmit={formik.handleSubmit}>
//                     <label htmlFor="sku">SKU </label>
//                     <input
//                         id="sku"
//                         name="sku"
//                         onChange={formik.handleChange}
//                         value={formik.values.sku}
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.sku}</p>
//                     <label htmlFor="product_title">Product Title </label>
//                     <input
//                         id="product_title"
//                         name="product_title"
//                         onChange={formik.handleChange}
//                         value={formik.values.product_title}
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.product_title}</p>
//                     <label htmlFor="product_description">Product Description </label>
//                     <input
//                         id="product_description"
//                         name="product_description"
//                         onChange={formik.handleChange}
//                         value={formik.values.product_description}
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.product_description} </p>
//                     <label htmlFor="cost">Cost </label>
//                     <input
//                         id="cost"
//                         name="cost"
//                         onChange={formik.handleChange}
//                         value={formik.values.cost}
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.cost} </p>
//                     <label htmlFor="quote_id">Quote Id </label>
//                     <input
//                         id="quote_id"
//                         name="quote_id"
//                         onChange={formik.handleChange}
//                         value={formik.values.quote_id}
//                         disabled
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.quote_id} </p>
//                     <label htmlFor="created_by">Created By </label>
//                     <input
//                         id="created_by"
//                         name="created_by"
//                         onChange={formik.handleChange}
//                         value={formik.values.created_by}
//                         disabled
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
//                     <label htmlFor="status">Status </label>
//                     <input
//                         id="status"
//                         name="status"
//                         onChange={formik.handleChange}
//                         value={formik.values.status}
//                         disabled
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.status} </p>
//                     <button type="submit">Submit</button>
//                 </form>
//                 <p style={{ color: 'red' }}>{errors ? errors : null}</p>
//             </div>
//         </>
//     )
// }

// export default CreateNewConfiguration

import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../../AgentProvider';

const CreateNewConfiguration = () => {

    const { agent, setConfiguration, errors, setErrors, quote, navigate, onSubmitNewQuoteForm } = useContext(AgentContext);

    const [ completeUnit, setAsCompleteUnit ] = useState(true)
    // const [ checked, setAsChecked ] = useState(true)
    const [ housing, setHousing ] = useState(true)
    const [ sideTrack, setSideTrack ] = useState(true)
    const [ hemBar, setHemBar ] = useState(true)
    const [ fabric, setFabric ] = useState(true)
    const [ motorTube, setMotorTube ] =useState(true)

    const handleToggle = (id) => {
        if (id === 'complete_unit') {
            setAsCompleteUnit(!completeUnit)
            // setAsChecked(!checked)
        }
        else if (id === 'housing') {
            setHousing(!housing)
        }
        else if (id === 'side_track') {
            setSideTrack(!sideTrack)
        }
        else if (id === 'hem_bar') {
            setHemBar(!hemBar)
        }
        else if (id === 'fabric'){
            setFabric(!fabric)
        }
        else if (id === 'motor_tube') {
            setMotorTube(!motorTube)
        }
    }

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
        left_retention: yup.string(),
        right_retention: yup.string(),
        tracks_exact_length: yup.string(),
        tracks_charge: yup.string(),
        hem_bar_type: yup.string(),
        hem_cap_color: yup.string(),
        pile_brush_style: yup.string(),
        hem_bar_charge: yup.string(),
        fabric_type: yup.string(),
        fabric_selection: yup.string(),
        seam_location: yup.string(),
        seam_location_num: yup.string(),
        zipper_color: yup.string(),
        usable_fabric_width: yup.string(),
        rotate_fabric: yup.string(),
        fabric_charge: yup.string(),
        color_collection: yup.string(),
        frame_color: yup.string(),
        powder_charge: yup.string(),
        list_price: yup.string(),
        quote_id: yup.string(),
    })

    const formik = useFormik({
        initialValues: {
            project_name: "",
            unit_name: "",
            complete_unit: `${completeUnit}`,
            housing: `${housing}`,
            side_track: `${sideTrack}`,
            hem_bar: `${hemBar}`,
            fabric: `${fabric}`,
            motor_tube: `${motorTube}`,
            motor_side: "",
            power_chord: "",
            motor_charge: "",
            tube_charge: "",
            housing_charge: "",
            retention_type: "",
            retention_cap_color: "",
            left_retention: "",
            right_retention: "",
            tracks_exact_length: "",
            tracks_charge: "",
            hem_bar_type: "",
            hem_cap_color: "",
            pile_brush_style: "",
            hem_bar_charge: "",
            fabric_type: "",
            fabric_selection: "",
            seam_location: "",
            seam_location_num: "",
            zipper_color: "",
            usable_fabric_width: "",
            rotate_fabric: "",
            fabric_charge: "",
            color_collection: "",
            frame_color: "",
            powder_charge: "",
            list_price: "",
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
                            navigate(`/quotes/${quote.id}`),
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
                        type="checkbox"
                        id="complete_unit"
                        name="complete_unit"
                        onChange={() => handleToggle('complete_unit')}
                        value={completeUnit}
                        checked={completeUnit}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.complete_unit} </p>
                    <label htmlFor="housing">Housing </label>
                    <input
                        type="checkbox"
                        id="housing"
                        name="housing"
                        onChange={() => handleToggle('housing')}
                        value={housing}
                        checked={housing}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.housing} </p>
                    <label htmlFor="side_track">Side Track </label>
                    <input
                        type="checkbox"
                        id="side_track"
                        name="side_track"
                        onChange={() => handleToggle('side_track')}
                        value={sideTrack}
                        checked={sideTrack}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.side_track} </p>
                    <label htmlFor="hem_bar">Hem Bar </label>
                    <input
                        type="checkbox"
                        id="hem_bar"
                        name="hem_bar"
                        onChange={() => handleToggle('hem_bar')}
                        value={hemBar}
                        checked={hemBar}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.hem_bar} </p>
                    <label htmlFor="fabric">Fabric </label>
                    <input
                        type="checkbox"
                        id="fabric"
                        name="fabric"
                        onChange={() => handleToggle('fabric')}
                        value={fabric}
                        checked={fabric}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.fabric} </p>
                    <label htmlFor="motor_tube">Motor Tube </label>
                    <input
                        type="checkbox"
                        id="motor_tube"
                        name="motor_tube"
                        onChange={() => handleToggle('motor_tube')}
                        value={motorTube}
                        checked={motorTube}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.motor_tube} </p>
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
                    <button type="submit">Submit</button>
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </div>
        </>
    )
}

export default CreateNewConfiguration
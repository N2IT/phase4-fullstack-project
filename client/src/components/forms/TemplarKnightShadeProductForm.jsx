import React, { useContext, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AgentContext } from '../../AgentProvider';
import { useParams } from 'react-router-dom';

import GENERAL from '../../data/templar_knight_shade/general_values.json';
import HOUSING from '../../data/templar_knight_shade/housing_type.json';
import HOUSING_OPTIONS from '../../data/templar_knight_shade/housing_options.json';
import MOTOR from '../../data/templar_knight_shade/motor_type.json';
import RETENTION from '../../data/templar_knight_shade/retention_type.json';
import HEM_BAR from '../../data/templar_knight_shade/hem_bar_type.json';
import FABRIC from '../../data/templar_knight_shade/fabric_type.json';
import FRAME from '../../data/templar_knight_shade/frame_type.json';
import PRICE from '../../data/templar_knight_shade/pricing_table.json';

const CreateNewCustomerForm = () => {

    // TODO: add route to fetch:
    // account data, customer data, etc.

    const { agent, errors, setErrors, navigate } = useContext(AgentContext);
    // const { id } = useParams();

    const [includedParts, setIncludedParts] = useState({
        housing: GENERAL.includedAssemblies.housing.defaultValue,
        side_track: GENERAL.includedAssemblies.side_track.defaultValue,
        hem_bar: GENERAL.includedAssemblies.hem_bar.defaultValue,
        fabric: GENERAL.includedAssemblies.fabric.defaultValue,
        buildout: GENERAL.includedAssemblies.buildout.defaultValue,
    });

    const unit_width_ft_ref = useRef(null);
    const unit_height_ft_ref = useRef(null);
    const motor_charge_ref = useRef(null);

    const allPartsIncluded = Object.keys(includedParts).every(key => includedParts[key] === true || key === "buildout");

    const formSchema = yup.object().shape({ /* TODO */ });


    const formik = useFormik({

        // all these values are imported from the data files and
        // are used to populate the default form fields and pricing


        initialValues: {

            // general information
            project_name: "",
            unit_name: "",

            // unit contents
            included_complete_unit: allPartsIncluded,
            included_housing: includedParts.housing,
            included_side_track: includedParts.side_track,
            included_hem_bar: includedParts.hem_bar,
            included_fabric: includedParts.fabric,
            included_buildout: includedParts.buildout,

            // unit information
            unit_width_in: 0,    // can we make
            unit_height_in: 0,  // these blank?

            // housing & motor options
            housing: HOUSING.defaultValue,
            housing_option: HOUSING_OPTIONS.defaultValue,
            motor_brand: MOTOR.defaultValue,
            motor_type: MOTOR.options[MOTOR.defaultValue].motor.options.defaultValue,
            motor_side: "", // required field from customer
            motor_cord: MOTOR.options[MOTOR.defaultValue].cord.options.defaultValue,
            motor_extended_cord: MOTOR.extendedCord.defaultValue,

            // retention options
            retention: RETENTION.track.defaultValue,
            retention_cap: RETENTION.cap.defaultValue,
            retention_left: RETENTION.track.defaultValue,
            retention_right: RETENTION.track.defaultValue,
            retention_cut_to_length: RETENTION.cutToLength.defaultValue,

            // hem bar
            hemBarType: HEM_BAR.hemBar.defaultValue,
            hemBarCap: HEM_BAR.cap.defaultValue,
            pileBrush: HEM_BAR.pileBrush.defaultValue,

            // fabric
            fabric_collection: FABRIC.options[FABRIC.defaultValue].name,
            fabric_color: FABRIC.options[FABRIC.defaultValue].options[FABRIC.options[FABRIC.defaultValue].defaultValue].name,
            seam_location: "N/A",
            zipper_color: FABRIC.zipper.colors[FABRIC.zipper.defaultValue],
            rotate_fabric: "N/A",

            // frame color
            frame_collection: "",
            frame_color: "",
            color_varies: false,
            frame_housing_collection: "",
            frame_housing_color: "",
            frame_retention_collection: "",
            frame_retention_color: "",
            frame_hem_bar_collection: "",
            frame_hem_bar_color: "",
            frame_buildout_collection: "",
            frame_buildout_color: "",

            submission_id: "",
            status: true,
            created_by: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            // TODO: ADD THIS
        }
    });

    console.log(MOTOR.options[formik.values.motor_brand]?.motor.options[formik.values.motor_type]?.price + MOTOR.options[formik.values.motor_brand]?.cord.options[formik.values.motor_cord]?.price);
    // put all logic behind calculations here- it needs to be done on update
    // isn't computationally expensive, so we can do it on every update
    if (motor_charge_ref.current) motor_charge_ref.current.value = 10 + MOTOR.options[formik.values.motor_brand]?.motor.options[formik.values.motor_type]?.price + 10 + MOTOR.options[formik.values.motor_brand]?.cord.options[formik.values.motor_cord]?.price;

    console.log(formik.values);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    return (
        <>
            <Container>
                <div className="account-details">
                    <h2>Configure your unit:</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col md={6} xs={12}>
                                <h3>Unit Information</h3>
                                <Row>
                                    <Col md={6} xs={12}>
                                        <div className="form-floating">
                                            <input
                                                id="project_name"
                                                name="project_name"
                                                className="form-control"
                                                onChange={formik.handleChange}
                                                value={formik.values.project_name}
                                            />
                                            <label htmlFor="project_name">Project Name</label>
                                            <p style={{ color: 'red' }}> {formik.errors.project_name}</p>
                                        </div>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className="form-floating">
                                            <input
                                                id="unit_name"
                                                name="unit_name"
                                                className="form-control"
                                                onChange={formik.handleChange}
                                                value={formik.values.unit_name}
                                            />
                                            <label htmlFor="last_name">Unit Name</label>
                                        </div>
                                        <p style={{ color: 'red' }}> {formik.errors.unit_name} </p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} xs={12}>
                                <h3>Unit Contents</h3>
                                <Row>
                                    <Col md={3} xs={4}>

                                        <div className="form-check align-items-center">
                                            <input
                                                type="checkbox"
                                                id="complete_unit"
                                                name="complete_unit"
                                                value={allPartsIncluded}
                                                checked={allPartsIncluded}
                                                className="form-check-input"
                                                onChange={(e) => {
                                                    formik.setFieldValue("complete_unit", allPartsIncluded);
                                                }}
                                            />
                                            <label className='form-check-label' htmlFor="complete_unit">Complete Unit</label>
                                        </div>
                                        <p style={{ color: 'red' }}> {formik.errors.completeUnit} </p>
                                    </Col>

                                    {Object.keys(includedParts).map((key, index) =>


                                        <Col md={3} xs={4}>
                                            <div key={index} className="form-check align-items-center">
                                                <input
                                                    type="checkbox"
                                                    id={key}
                                                    name={key}
                                                    value={includedParts[key]}
                                                    checked={includedParts[key]}
                                                    className="form-check-input"
                                                    onChange={(e) => {
                                                        formik.setFieldValue(`included_${key}`, !formik.values[key]);
                                                        setIncludedParts({ ...includedParts, [key]: !includedParts[key] });
                                                    }}
                                                />
                                                <label className='form-check-label' htmlFor={key}>{GENERAL.includedAssemblies[key].name}</label>
                                                <p style={{ color: 'red' }}> {formik.errors[key]} </p>
                                            </div>
                                        </Col>

                                    )}
                                </Row>
                            </Col>
                            <Col md={6} xs={12}>
                                <h3>Unit Size</h3>
                                <Row>
                                    <Col md={6} xs={12}>
                                        <div className="form-floating">
                                            <input
                                                id="unit_width_in"
                                                name="unit_width_in"
                                                className="form-control"
                                                onChange={e => {
                                                    formik.handleChange(e);
                                                    const unit_width_ft = `${Math.floor(e.target.value / 12)}ft`;
                                                    const unit_width_in = e.target.value % 12 > 0 ? ` - ${e.target.value % 12}in` : '';
                                                    unit_width_ft_ref.current.value = e.target.value > 0 ? unit_width_ft + unit_width_in : '';
                                                }}
                                                // placeholder={formik.values.unit_width_in}
                                                required
                                            />
                                            <label htmlFor="unit_width_in">Width (in)</label>
                                        </div>
                                        <p style={{ color: 'red' }}> {formik.errors.unit_width_in} </p>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className="form-floating">
                                            <input
                                                id="unit_width_ft"
                                                name="unit_width_ft"
                                                className="form-control"
                                                ref={unit_width_ft_ref}
                                                readOnly
                                            />
                                            <label htmlFor="unit_width_ft">Width (ft-in)</label>
                                        </div>
                                        <p />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className="form-floating">
                                            <input
                                                id="unit_height_in"
                                                name="unit_height_in"
                                                className="form-control"
                                                onChange={e => {
                                                    formik.handleChange(e);
                                                    const unit_height_ft = `${Math.floor(e.target.value / 12)}ft`;
                                                    const unit_height_in = e.target.value % 12 > 0 ? ` - ${e.target.value % 12}in` : '';
                                                    unit_height_ft_ref.current.value = e.target.value > 0 ? unit_height_ft + unit_height_in : '';
                                                }}
                                                required
                                            />
                                            <label htmlFor="unit_height_in">Height (in)</label>
                                        </div>
                                        <p style={{ color: 'red' }}> {formik.errors.unit_height_in} </p>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className="form-floating">
                                            <input
                                                id="unit_height_ft"
                                                name="unit_height_ft"
                                                className="form-control"
                                                ref={unit_height_ft_ref}
                                                readOnly
                                            />
                                            <label htmlFor="unit_height_ft">Height (ft-in)</label>
                                        </div>
                                        <p style={{ color: 'red' }}> {formik.errors.unit_height_in} </p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <h3>Housing & Motor Options</h3>
                                <Row>
                                    <Col md={6} xs={12}>
                                        <div className="form-floating">
                                            <select
                                                id='housing'
                                                name='housing'
                                                className='form-select'
                                                value={formik.values.housing}
                                                onChange={formik.handleChange}
                                                required
                                            >
                                                <option value=''>Select</option>
                                                {Object.keys(HOUSING.options)
                                                    .filter(key => HOUSING.options[key].visible)
                                                    .map(key =>
                                                        <option
                                                            key={key}
                                                            value={key}
                                                            disabled={!HOUSING.options[key].enabled}
                                                        >
                                                            {HOUSING.options[key].displayName}
                                                        </option>
                                                    )}
                                            </select>
                                            <label htmlFor='housing'>Housing</label>
                                        </div>
                                        <p style={{ color: 'red' }}>{formik.errors.housing}</p>
                                    </Col>

                                    <Col md={6} xs={12}>
                                        <div className="form-floating">
                                            <select
                                                id='housing_option'
                                                name='housing_option'
                                                className='form-select'
                                                value={formik.values.housing_option}
                                                onChange={formik.handleChange}
                                                required
                                            >
                                                <option value=''>Select</option>
                                                {Object.keys(HOUSING_OPTIONS.options)
                                                    .filter(key => HOUSING_OPTIONS.options[key].visible)
                                                    .map(key =>
                                                        <option
                                                            key={key}
                                                            value={key}
                                                            disabled={!HOUSING_OPTIONS.options[key].enabled}
                                                        >
                                                            {HOUSING_OPTIONS.options[key].displayName}
                                                        </option>
                                                    )}
                                            </select>
                                            <label htmlFor='housing_option'>Housing Option</label>
                                        </div>
                                        <p style={{ color: 'red' }}>{formik.errors.housing_option}</p>
                                    </Col>
                                    <Col md={6} xs={12}>

                                        <div className="form-floating">
                                            <select
                                                id='motor_brand'
                                                name='motor_brand'
                                                className='form-select'
                                                value={formik.values.motor_brand}
                                                onChange={formik.handleChange}
                                                required
                                            >
                                                <option value=''>Select</option>
                                                {Object.keys(MOTOR.options)
                                                    .map(key =>
                                                        <option
                                                            key={key}
                                                            value={key}
                                                            disabled={!MOTOR.options[key].enabled}
                                                        >
                                                            {MOTOR.options[key].displayName}
                                                        </option>
                                                    )}
                                            </select>
                                            <label htmlFor='motor_brand'>Motor Brand</label>
                                        </div>
                                        <p style={{ color: 'red' }}>{formik.errors.motor_brand}</p>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className="form-floating">
                                            <select
                                                id='motor_type'
                                                name='motor_type'
                                                className='form-select'
                                                value={formik.values.motor_type}
                                                onChange={formik.handleChange}
                                                required
                                            >
                                                <option value=''>Select</option>
                                                {formik.values.motor_brand && Object.keys(MOTOR.options[formik.values.motor_brand]?.motor.options)
                                                    .filter(key => MOTOR.options[formik.values.motor_brand].motor.options[key].visible)
                                                    .map(key =>
                                                        <option
                                                            key={key}
                                                            value={key}
                                                            disabled={!MOTOR.options[formik.values.motor_brand].motor.options[key].enabled}
                                                        >
                                                            {MOTOR.options[formik.values.motor_brand].motor.options[key].displayName}
                                                        </option>
                                                    )}
                                            </select>
                                            <label htmlFor='motor_type'>Motor Type</label>
                                        </div>
                                        <p style={{ color: 'red' }}>{formik.errors.motor_type}</p>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className="form-floating">
                                            <select
                                                id='motor_side'
                                                name='motor_side'
                                                className='form-select'
                                                value={formik.values.motor_side}
                                                onChange={formik.handleChange}
                                                required
                                            >
                                                <option value=''>Select</option>
                                                <option value='left'>Left</option>
                                                <option value='right'>Right</option>
                                            </select>
                                            <label htmlFor='motor_side'>Motor Side</label>
                                        </div>
                                        <p style={{ color: 'red' }}>{formik.errors.motor_side}</p>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className="form-floating">
                                            <select
                                                id='motor_cord'
                                                name='motor_cord'
                                                className='form-select'
                                                value={formik.values.motor_cord}
                                                onChange={formik.handleChange}
                                                required
                                            >
                                                <option value=''>Select</option>
                                                {formik.values.motor_brand && Object.keys(MOTOR.options[formik.values.motor_brand].cord.options)
                                                    .filter(key => MOTOR.options[formik.values.motor_brand].cord.options[key].visible)
                                                    .map(key =>
                                                        <option
                                                            key={key}
                                                            value={key}
                                                            disabled={!MOTOR.options[formik.values.motor_brand].cord.options[key].enabled}
                                                        >
                                                            {MOTOR.options[formik.values.motor_brand].cord.options[key].displayName}
                                                        </option>
                                                    )}
                                            </select>
                                            <label htmlFor='motor_cord'>Motor Cord</label>
                                        </div>
                                        <p style={{ color: 'red' }}>{formik.errors.motor_cord}</p>
                                    </Col>
                                    <Col md={4} xs={12}>
                                        <div className="form-floating">
                                            <input
                                                id="motor_charge"
                                                name="motor_charged"
                                                className="form-control"
                                                value={formatCurrency((MOTOR.options[formik.values.motor_brand]?.motor.options[formik.values.motor_type]?.price || 0) + (MOTOR.options[formik.values.motor_brand]?.cord.options[formik.values.motor_cord]?.price || 0))}
                                                ref={motor_charge_ref}
                                                disabled
                                            />
                                            <label htmlFor="motor_charge">Motor Charge</label>
                                        </div>
                                    </Col>
                                    <Col md={4} xs={12}>
                                        <div className="form-floating">
                                            <input
                                                id="tube_charge"
                                                name="tube_charge"
                                                className="form-control"
                                                value={formatCurrency(PRICE.tube[formik.values.housing][Math.ceil(formik.values.unit_width_in / 12)] || 0)}
                                                disabled
                                            />
                                            <label htmlFor="tube_charge">Tube Charge</label>
                                        </div>
                                    </Col>
                                    <Col md={4} xs={12}>
                                        <div className="form-floating">
                                            <input
                                                id="housing_charge"
                                                name="housing_charge"
                                                className="form-control"
                                                value={formatCurrency(PRICE.housing[formik.values.housing][Math.ceil(formik.values.unit_width_in / 12)] || 0)}
                                                disabled
                                            />
                                            <label htmlFor="housing_charge">Housing Charge</label>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </form>
                    <p style={{ color: 'red' }}>{errors ? errors : null}</p>
                </div>
            </Container >
        </>
    );

};

export default CreateNewCustomerForm;

import React, { useContext, useState } from 'react';
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

    // check if all parts are included, besides the buildout
    // we dont need a useState for this.
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
            included_housing: includedParts.housing,
            included_side_track: includedParts.side_track,
            included_hem_bar: includedParts.hem_bar,
            included_fabric: includedParts.fabric,
            included_buildout: includedParts.buildout,

            // unit information
            unit_width_in: GENERAL.width_in.defaultValue,    // can we make
            unit_height_in: GENERAL.height_in.defaultValue,  // these blank?

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
    })


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
                                        <label htmlFor="project_name">Project Name</label>
                                        <br />
                                        <input
                                            id="project_name"
                                            name="project_name"
                                            onChange={formik.handleChange}
                                            value={formik.values.project_name}
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.project_name}</p>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <label htmlFor="last_name">Unit Name</label>
                                        <br />
                                        <input
                                            id="unit_name"
                                            name="unit_name"
                                            onChange={formik.handleChange}
                                            value={formik.values.unit_name}
                                        />
                                        <p style={{ color: 'red' }}> {formik.errors.unit_name} </p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} xs={12}>
                                <h3>Unit Contents</h3>
                                <Row>
                                    <Col md={3} xs={4}>

                                        <div className="form-check d-flex align-items-center">
                                            <input
                                                type="checkbox"
                                                id="complete_unit"
                                                name="complete_unit"
                                                value={allPartsIncluded}
                                                checked={allPartsIncluded}
                                                onChange={(e) => {
                                                    formik.setFieldValue("complete_unit", !formik.values.complete_unit);
                                                }}
                                            />

                                            <label htmlFor="complete_unit" style={{ whiteSpace: 'nowrap' }}>Complete Unit</label>
                                            <p style={{ color: 'red' }}> {formik.errors.completeUnit} </p>
                                        </div>

                                        {Object.keys(includedParts).map((key, index) =>

                                            <div key={index} className="form-check d-flex align-items-center">
                                                <input
                                                    type="checkbox"
                                                    id={key}
                                                    name={key}
                                                    value={includedParts[key]}
                                                    checked={includedParts[key]}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(`included_${key}`, !formik.values[key]);
                                                        setIncludedParts({ ...includedParts, [key]: !includedParts[key] });
                                                    }}
                                                />

                                                <label htmlFor={key} style={{ whiteSpace: 'nowrap' }}>{GENERAL.includedAssemblies[key].name}</label>
                                                <p style={{ color: 'red' }}> {formik.errors[key]} </p>
                                            </div>

                                        )}
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

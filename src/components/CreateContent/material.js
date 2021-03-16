import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { uploadMaterial } from "../../redux/actions/CoursesAction";
import { NotificationContainer } from "react-notifications";

export default function Material() {
    const dispatch = useDispatch();

    const { idContent, materialKey } = useSelector(state => state.courses)

    const [contentMaterial, setMaterial] = useState("")
    const [isAdd1, setAdd1] = useState(false);

    const submitMaterial = () => {
        const data = new FormData();
        data.append('file', contentMaterial);
        dispatch(uploadMaterial(idContent, data))
        setAdd1(true)
    }

    const cancelMaterial = () => {
        setAdd1(false)
    }

    return (
        <>
            <p>
                <input
                    type="file"
                    placeholder="Image"
                    id='upload'
                    onChange={(e) => setMaterial(e.target.files[0])}
                />
                <hr type="solid" />
            </p>
            <p>
                {!isAdd1 ? (
                    <button className='material-lesson' onClick={submitMaterial} >Add Lesson Material</button>
                ) : (
                    <>
                        {materialKey != null ? (
                            <button className='material-lesson'>Material Saved</button>
                        ) : (
                            <div className="loading-dot">
                                <div>
                                    <div className="dot-pulse"></div>
                                    <div className="upload">uploading</div>
                                </div>
                                <div onClick={cancelMaterial} className="cancel">Cancel</div>
                            </div>
                        )}
                    </>
                )}
            </p>
            <p>Max. size 20MB. Supported format .pdf</p>
            <NotificationContainer />
        </>
    )
}

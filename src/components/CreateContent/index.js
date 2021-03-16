import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postContent, uploadVideo } from "../../redux/actions/CoursesAction";
import Material from './material';
import { NotificationContainer } from "react-notifications";

export default function CreateContent() {
    const dispatch = useDispatch();

    const { id, idContent, videoKey, courseId } = useSelector(state => state.courses)

    const [number, setNumber] = useState("");
    const [description, setDescription] = useState("");
    const [titleContent, setTitleContent] = useState("");
    const [video, setVideo] = useState("");
    const [isAdd2, setAdd2] = useState(false);
    const [isAdd3, setAdd3] = useState(false);
    const [materialList, setMaterialList] = useState([]);


    const submitContent = (e) => {
        setAdd3(true)
        e.preventDefault()
        id === null ? (
            dispatch(postContent(courseId, titleContent, description, number))
        ) : (
            dispatch(postContent(id, titleContent, description, number))
        );
    }

    const submitVideo = () => {
        const data = new FormData();
        data.append('video', video);
        dispatch(uploadVideo(idContent, data))
        setAdd2(true)
    }

    const addContent = () => {
        setMaterialList(
            materialList.concat(<Material key={materialList.length} />)
        );
    };

    const cancelContent = () => {
        setAdd3(false)
    }

    const cancelVideo = () => {
        setAdd2(false)
    }

    // console.log(videoKey);
    return (
        <div className='add-new-lesson-box'>
            <div className='add-new-lesson-input'>
                <h4>
                    <b>Lesson #
                            <input className="input-number"
                            type="text"
                            placeholder="1*"
                            onChange={(e) => setNumber(e.target.value)}
                            value={number}
                        />
                    </b>
                </h4>
                <div className='add-new-lesson-title'>
                    <p>
                        <input
                            type="text"
                            placeholder="Title*"
                            onChange={(e) => setTitleContent(e.target.value)}
                            value={titleContent}
                        />
                    </p>
                    <p>
                        <hr type="solid" />
                    </p>
                </div>
                <div className='add-new-lesson-description'>
                    <p>
                        <textarea
                            type="text"
                            placeholder="Description*"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </p>
                    <p>
                        <hr type="solid" />
                    </p>
                </div>
                <p className='save'>
                    {!isAdd3 ? (
                        <button onClick={submitContent}>Save</button>
                    ) : (
                        <>
                            {idContent === null ? (
                            <div className="loading-dot">
                                <div id="small-loader-navbar"></div>
                                <div onClick={cancelContent} className="cancel">Cancel</div>
                            </div>
                            ) : (
                                <button>Saved</button>
                            )}
                        </>
                    )}
                </p>
            </div>
            <div className='upload-new-lesson'>
                <p>
                    <input
                        type="file"
                        placeholder="Image"
                        id='upload'
                        onChange={(e) => { setVideo(e.target.files[0]) }}
                    />
                    <hr type="solid" />
                </p>
                <p>
                    {!isAdd2 ? (
                        <button className='video-lesson' onClick={submitVideo}>Upload Video</button>
                    ) : (
                        <>
                        {videoKey === 201 ? (
                        <button className='video-lesson'>Video Saved</button>
                        ) : (
                            <div className="loading-dot">
                            <div>
                              <div className="dot-pulse"></div>
                              <div className="upload">uploading</div>
                            </div>
                            <div onClick={cancelVideo} className="cancel">Cancel</div>
                          </div>                     
                            )}
                        </>
                    )}
                </p>
                <p>Required. Max. size 200 MB. Supported format .mp4</p>
                <Material />
                {materialList}
                <div className="teacher-add-new-lesson-button">
                    <p onClick={addContent}>Add more material</p>
                </div>
            </div>
            <NotificationContainer />
        </div>
    )
}



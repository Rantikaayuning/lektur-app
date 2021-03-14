import React from 'react'

export default function ContentMaterial(props) {
    const { lessonList } = props;
    return (
        <div className="material-lock">
            <p className="lock-text">Content</p>
            <div className="lock-content">
                {lessonList}
            </div>
        </div>
    )
}

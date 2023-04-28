import { useState } from 'react'
import { Job } from '@/interfaces/job'

import styles from './JobCard.module.css'

type JobCard = Job & {
    onApply: () => void;
    onSave: () => void;
}

const JobCard = (job: JobCard)  => {
    const [showDescription, setShowDescription] = useState(false)

    const toggleDescriptionDisplay = () => {
        setShowDescription(prevShowValue => !prevShowValue)
    }

    return (
        <div className={styles.card}>
            <div className={styles.pointer} onClick={toggleDescriptionDisplay}>
                <h3>
                    {job.title}
                </h3>
                <p>{job.location}</p>
            </div>
            {showDescription  &&
            <div className={styles.description}>
                <p >
                    {job.description}
                </p>
                <div className={styles.footer}>
                    <button onClick={job.onApply} className={styles.buttonSecondary}>Apply Now</button>
                    <button onClick={job.onSave} className={styles.buttonPrimary}>Save</button>
                </div>
            </div> }
        </div>
    )
}

export default JobCard
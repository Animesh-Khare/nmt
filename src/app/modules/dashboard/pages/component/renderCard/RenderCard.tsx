import React from 'react'
import todo from '@assets/images/OverviewTab/Todo.svg'
import progress from '@assets/images/OverviewTab/Inprogress.svg'
import done from '@assets/images/OverviewTab/Done.svg'
import styles from './RenderCard.module.css'
interface RenderCardProps {
    item: {
        taskName: string
        topicName: string
        taskOwner: string
        deadline: string
        status: string
    }
}

const RenderCardComponent: React.FC<RenderCardProps> = ({ item }) => {
    return (
        <div style={{ display: 'flex',  flexDirection: 'column' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between' ,margin: '2px 0',}}>
    <div className={styles.card_heading}>{item.taskName}</div>
    <div>
      <img
        src={
          item.status === 'To do'
            ? todo
            : item.status === 'In progress'
            ? progress
            : item.status === 'Done'
            ? done
            : ''
        }
        alt=""
      />
    </div>
  </div>
  <div className={styles.content}>{item.topicName}</div>
  <div style={{ display: 'flex', justifyContent: 'space-between',margin: '8px 0' }}>
    <div className={styles.card_footer}>{item.taskOwner}</div>
    <div className={styles.deadline}>{item.deadline}</div>
  </div>
</div>
    )
}

export default RenderCardComponent

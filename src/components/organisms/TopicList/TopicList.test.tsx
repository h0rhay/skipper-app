import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TopicList } from './TopicList'

describe('TopicList', () => {
  it('renders all 17 topic rows', () => {
    render(<TopicList onTopicClick={() => {}} />)
    // 17 buttons (one per topic)
    expect(screen.getAllByRole('button')).toHaveLength(17)
  })

  it('calls onTopicClick with topicId', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<TopicList onTopicClick={onClick} />)
    await user.click(screen.getAllByRole('button')[0])
    expect(onClick).toHaveBeenCalledWith(expect.any(String))
  })
})

import { IconThumbUpStroked, IconComment } from '@douyinfe/semi-icons'
import dayjs from 'dayjs'
import { FC } from 'react'
import { useRecoilState } from 'recoil'

import { Article } from '@/api'
import { historyArticlesState } from '../store/articles'

export const Cart: FC<{ article: Article }> = ({ article }) => {
  const { article_info, author_user_info, category_info } = article
  const now = dayjs()
  const realTime = dayjs(+(article_info.rtime + '000'))
  const diffDays = now.diff(realTime, 'days')
  const [historyArticles, setHistoryArticles] =
    useRecoilState(historyArticlesState)
  const handleClick = () => {
    let idx = historyArticles.findIndex(
      a => a.article_id === article.article_id,
    )
    if (idx !== -1) {
      setHistoryArticles(v => {
        const arr = [...v]
        arr.splice(idx, 1)
        return arr
      })
    }
    setHistoryArticles(v => [article, ...v])
    window.open(`/post/${article.article_id}`)
  }
  return (
    <div
      className="mx-4 my-2 border-b-2 border-gray-200 text-sm"
      onClick={handleClick}>
      <div className="flex my-2">
        <div className="text-gray-600">{author_user_info.user_name}</div>
        <div
          style={{ width: 1 }}
          className="transform scale-y-75 mx-2 bg-gray-300"
        />
        <div className="text-gray-400">{diffDays}天前</div>
      </div>
      <div className="my-2 font-bold text-xl">{article_info.title}</div>
      <div className="flex h-24 my-2">
        <div className="overflow-hidden overflow-ellipsis flex-1">
          {article_info.brief_content}
        </div>
        {article_info.cover_image !== '' && (
          <img
            className="h-full w-32 ml-2"
            src={article_info.cover_image}
            alt={article_info.title}
          />
        )}
      </div>
      <div className="text-gray-400 flex justify-between my-2">
        <div className="flex">
          <div className="flex items-center mr-8">
            <IconThumbUpStroked className="mr-1" />
            <span>{article_info.digg_count}</span>
          </div>
          <div className="flex items-center">
            <IconComment className="mr-1" />
            <span>{article_info.comment_count}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-500">
          <div className="py-.5 px-2 ml-2 bg-gray-50">
            {category_info.first_category_name}
          </div>
          <div className="py-.5 px-2 ml-2 bg-gray-50">
            {category_info.second_category_name}
          </div>
        </div>
      </div>
    </div>
  )
}
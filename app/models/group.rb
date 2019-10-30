class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true, uniqueness: true

  def show_end_message
    if (end_message = messages.end).present?
      if end_message.content?
        end_message.content
      else
        '画像が投稿されています'
      end
    else
      '新着メッセージはありません。'
    end
  end
end

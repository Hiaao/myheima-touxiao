import { authorLogin, getSms } from './login'
import { getUserInfo, addFollow, deleteFollow } from './user'
import { getUserChannel, getAllChannel, setUserChannel, DeleteUserChannel } from './channel'
import { getArticles, getArticlesInfo, addCollection, deleteCollection, addLiking, deleteLiking } from './article'
import { getSuggestion, getSearch } from './search'
import { getComments, addCommentLiking, deleteCommentLiking, addComment } from './comment'

export const authorLoginAPI = authorLogin
export const getSmsAPI = getSms

export const getUserInfoAPI = getUserInfo
export const addFollowAPI = addFollow
export const deleteFollowAPI = deleteFollow

export const getUserChannelAPI = getUserChannel
export const getAllChannelAPI = getAllChannel
export const setUserChannelAPI = setUserChannel
export const DeleteUserChannelAPI = DeleteUserChannel

export const getArticlesAPI = getArticles
export const getArticlesInfoAPI = getArticlesInfo
export const addCollectionAPI = addCollection
export const deleteCollectionAPI = deleteCollection
export const addLikingAPI = addLiking
export const deleteLikingAPI = deleteLiking

export const getSuggestionAPI = getSuggestion
export const getSearchAPI = getSearch

export const getCommentsAPI = getComments
export const addCommentLikingAPI = addCommentLiking
export const deleteCommentLikingAPI = deleteCommentLiking
export const addCommentAPI = addComment

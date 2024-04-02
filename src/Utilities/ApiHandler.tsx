import axiosHandler from "./AxiosHandler";
import { API_ROOT } from "./api-config";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

// const BASE_URL = API_ROOT;
const BASE_URL = 'http://65.2.136.164:9092';

export const userLogin = async (accessToken: string) => {
  try {
    const response = await axiosHandler({
      url: `${BASE_URL}/login-with-google`,
      method: METHODS.GET,
      headers: {
        'Access-Token': accessToken,
        'Accept': 'application/json, text/plain',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchHomePageDetails = async (sessionId: string) => {
  try {
    const response = await axiosHandler({
      url: `${BASE_URL}/homePage`,
      method: METHODS.GET,
      headers: {
        'Accept': 'application/json, text/plain',
        'Session-Id': sessionId,
      },
    });
    return response;

  } catch (error) {
    throw error;
  }
};

export const getSessionId = async (accessToken: string) => {
  try {
    const response = await axiosHandler({
      url: `${BASE_URL}/getSession`,
      method: METHODS.GET,
      headers: {
        'Access-Token': accessToken,
        'Accept': 'application/json, text/plain'
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const userSignOut = async (sessionId: string) => {
  try {
    const response = await axiosHandler({
      url: `${BASE_URL}/sign-out`,
      method: METHODS.GET,
      headers: {
        'Session-Id': sessionId,
        'Accept': 'application/json, text/plain'
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const submitFeedback = async (sessionId: string, feedbackMessage: string) => {
  try {
    const response = await axiosHandler({
      url: `${BASE_URL}/feedback`,
      method: METHODS.POST,
      headers: {
        'Session-Id': sessionId,
        'Accept': 'application/json, text/plain'
      },
      data: {
        FeedBackMessage: feedbackMessage
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserDetails = async (sessionId: string, mobileNumber: string, name: string) => {
  try {
    const payload = {
      MobileNumber: mobileNumber,
      Name: name
    };

    const response = await axiosHandler({
      url: `${BASE_URL}/updateUserDetails`,
      method: METHODS.POST,
      headers: {
        'Session-Id': sessionId,
        'Accept': 'application/json, text/plain'
      },
      data: payload
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getLeaderBoardDetails = async (sessionId: string, campaignId: string, page: string) => {
  try {

    let leaderUrl = `${BASE_URL}/campaign/${campaignId}/leaderBoard?count=50`

    if(page=='history'){
      leaderUrl=`${BASE_URL}/campaign/${campaignId}/leaderBoard?count=50&type=history`
    }
    const response = await axiosHandler({
      url: leaderUrl,
      method: METHODS.GET,
      headers: {
        'Session-Id': sessionId,
        'Accept': 'application/json, text/plain'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getNotification = async (sessionId: string) => {
  try {
    const response = await axiosHandler({
      url: `${BASE_URL}/notifications`,
      method: METHODS.GET,
      headers: {
        'Session-Id': sessionId,
        'Accept': 'application/json, text/plain'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateNotification = async (sessionId: string, messageId: string) => {
  try {
    const payload = {
      messageId: messageId,
    };

    const response = await axiosHandler({
      url: `${BASE_URL}/updateNotification`,
      method: METHODS.PUT,
      headers: {
        'Session-Id': sessionId,
        'Accept': 'application/json, text/plain'
      },
      data: payload
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchCampaignInfomation = async (sessionId: string, campaignId: string) => {
  try {
    const response = await axiosHandler({
      url: `${BASE_URL}/campaign/${campaignId}/fetchCampaignInfo`,
      method: METHODS.GET,
      headers: {
        'Session-Id': sessionId,
        'Accept': 'application/json, text/plain'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const postGameScore = async (sessionId: string, campaignId: string, gameScore: number, retryCount: number) => {
  try {
    const payload = {
      gameScore: gameScore,
      campaignId: campaignId,
      retryCount: retryCount
    };

    const response = await axiosHandler({
      url: `${BASE_URL}/postGameScore`,
      method: METHODS.POST,
      headers: {
        'Session-Id': sessionId,
        'Accept': 'application/json, text/plain'
      },
      data: payload
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getRewards = async (sessionId: string) => {
  try {
    const response = await axiosHandler({
      url: `${BASE_URL}/reward`,
      method: METHODS.GET,
      headers: {
        'Session-Id': sessionId,
        'Accept': 'application/json, text/plain'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

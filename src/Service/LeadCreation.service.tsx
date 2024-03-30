import { API } from "./api-service";

const LeadCreation = {
  //   createAhlLead(data: any) {
  //     return API.post(`/ahlLead/create`, data);
  //   },
  //   // /getPartnerName/{refPartnerId}
  //   getPartnerName(partnerId: any) {
  //     return API.get(`/getPartnerName/${partnerId}`);
  //   },
  //   dedupeCheck(
  //     dedupeCheckFor: String,
  //     panOrMobileNo: String,
  //     partnerId: String,
  //     name: string
  //   ) {
  //     const payLoad = {
  //       fieldName: dedupeCheckFor,
  //       fieldValue: panOrMobileNo,
  //       partnerId: partnerId,
  //     };
  //     return API.post(`/dedupeCheck`, payLoad);
  //   },
  //   validatePan(panNumber: String, fieldName: String) {
  //     return API.get(`/validatePan/${fieldName}/${panNumber}`);
  //   },
  //   uploadDocument(data: any, ahlId: String) {
  //     return API.post(`/ahl/${ahlId}/documents/upload/PRM`, data);
  //   },
  //   fetchLeadDetails(ahlId: String) {
  //     return API.get(`/ahl/leadDetails/${ahlId}`);
  //   },
  //   uploadPanCard(partnerId: String, file: any) {
  //     return API.post(`/uploadPanCard/${partnerId}`, file);
  //   },
  //   getUploadedDocs(ahlId: String) {
  //     return API.get(`/ahl/${ahlId}/documents`);
  //   },
  //   deleteDoc(ahlId: String, listOfIds: [String]) {
  //     return API.post(`/deleteDocuments/${ahlId}`, listOfIds);
  //   },
  //   fetchCityState(pincode: Number) {
  //     return API.get(`/fetchStateCity/${pincode}`);
  //   },
  //   saveCoApplicantDetails(ahlId: String, payLoad: any) {
  //     return API.post(`/update/ahlCoApplicant/${ahlId}`, payLoad);
  //   },
  //   getDocument(file: String) {
  //     return API.get(`document/view/inline?url=${file}`);
  //   },
};

export default LeadCreation;


import {Report} from "../models/Report.js";
class ReportService {
  async createReport(reportTitle, reportDescription, reportType, reportStatus, userID, artID) {
    try {
      const report = await Report.create({reportTitle, reportDescription,reportType, reportStatus,userID,artID}); // create a new report
      
        return report;
        // notification to admin and user
        
       
        
    }
    catch (err) {
      throw err;
    }
    }


}
export default new ReportService();
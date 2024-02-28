import { Report } from "../models/Report.js";
class ReportService {
  async createReport(
    reportTitle,
    reportDescription,
    reportType,
    reportStatus,
    userID,
    artID
  ) {
    try {
      const report = await Report.create({
        reportTitle,
        reportDescription,
        reportType,
        reportStatus,
        userID,
        artID,
      }); // create a new report

      return report;
      // notification to admin and user
    } catch (err) {
      throw err;
    }
  }

  async getReportByArtId(artID) {
    try {
      const report = await Report.find({ artID: artID });
      return report;
    } catch (err) {
      throw err;
    }
  }

  async updateReportStatus(reportID, reportStatus) {
    try {
      const report = await Report.findByIdAndUpdate(
        reportID,
        { reportStatus: reportStatus },
        { new: true }
      );
      return report;
    } catch (err) {
      throw err;
    }
  }
}
export default new ReportService();

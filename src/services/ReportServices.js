import { Report } from "../models/Report.js";
import { Art } from "../models/Art.js";
import NotificationServices from "./NotificationServices.js";
class ReportService {
  async createReport(reportData) {
    try {
      const report = new Report(reportData);
      await NotificationServices.sendReportAdminNotification(reportData);
      const savedReport = await report.save();
      return savedReport;
    } catch (error) {
      throw error;
    }
  }

  async getListReport() {
    try {
      const reportList = await Report.find({}).sort({
        createdAt: -1,
      });
      return reportList;
    } catch (error) {
      throw error;
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

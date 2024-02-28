
import ReportService from "../services/ReportService.js";
import reportService from "../services/ReportService.js";

class ReportController {
  async createReport(req, res) {
    try {
      const data = await reportService.createReport(req.body.userID, req.body.artID);
      res.status(201).json({ message: "Success" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getListReport(req, res) {
    try {
      const reportList = await ReportService.getListReport();
      return res.status(200).json({ success: true, data: reportList });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
export default new ReportController();
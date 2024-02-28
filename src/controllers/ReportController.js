
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
  async getReportByArtId(req, res) {
    try {
      const data = await reportService.getReportByArtId(req.params.artID);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async updateReportStatus(req, res) {
    try {
      const data = await reportService.updateReportStatus(req.params.reportID, req.body.reportStatus);
      res.status(200).json({ message: "Success" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
}
export default new ReportController();
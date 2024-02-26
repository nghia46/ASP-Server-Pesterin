
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
}
export default new ReportController();
import { Cusine } from "./../models/ServingCusine";

export default {
  async getCusines(req, res) {
    try {
      const Cusine = await Cusine.find({});
      res.json({ Cusine });
    } catch (e) {
      console.log("Error getting Cusines", e);
      res.json({ code: "ABT0001" });
    }
  }
}
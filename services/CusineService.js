
const Cusine = require('./../models/ServingCusine')
module.exports =  {
  async getCusines(req, res) {
    try {
      const getCusine = await Cusine.find();
      res.send( getCusine );
    } catch (e) {
      console.log("Error getting Cusines", e);
      res.json({ code: "ABT0001" });
    }
  },
  async addCusines(req, res) {
    try {

      let ServingCusine = {
        cusine:req.body.cusine
      }; 
      // console.log(req.body.cusine);
      // console.log(ServingCusine);
      const saveCusine = new Cusine(ServingCusine);
      await saveCusine.save();
      res.json({ code: "ABT0000" });
    } catch (e) {
      console.log("Error saving Cusines", e);
      res.json({ code: "ABT0001" });
    }
  },
  async deleteCusines(req, res)
  {
    try {
      await Cusine.find({ _id: req.body._id }).remove().exec();
      let response = { code: "ABT0000", message: "Cusines deleted successfully!" };
      console.log(response);
      res.json(response);
  } catch (e) {
      console.log("error while deleting Cusines -> ", e)
      let response = { code: "ABT0001", message: "failed to delete Cusines" };
      console.log(response);
      res.json(response);
  }
  }

}
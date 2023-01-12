import { db } from "../db.js";
import util from "util"

export const getUsers = async (_, res) => {
    const q = "SELECT * FROM reports";
  
    const query = util.promisify(db.query).bind(db);

    try {
      const responseData = await query(q);
    
      return res.status(200).json(responseData);
      
    }catch (err) {
      return res.send(err)
    }
  };

  export const addUser = (req, res) => {
    const q =
      "INSERT INTO reports (`dia`, `tempo`, `descricao`, `data`) VALUES(?)";
  
    const values = [
      req.body.dia,
      req.body.tempo,
      req.body.descricao,
      req.body.data,      
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Relatorio criado com sucesso.");
    });
  };

  export const updateUser = (req, res) => {
    const q =
      "UPDATE reports SET `dia` = ?, `tempo` = ?, `descricao` = ?, `data` = ? WHERE `id` = ?";
  
    const values = [
      req.body.dia,
      req.body.tempo,
      req.body.descricao,
      req.body.data,     
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Relatorio atualizado com sucesso.");
    });
  };

  export const deleteUser = (req, res) => {
    const q = "DELETE FROM reports WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Relatorio deletado com sucesso.");
    });
  };
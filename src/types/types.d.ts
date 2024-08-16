import { Express } from "express";

declare global {
  namespace Express {
    export interface Request {
      user?: any;
      }
      
      
      
      //   user_id: string;
      //   username: string;
      //   password: string;
      //   email: string;
      //   created_at?: Date;
      //   updated_at?: Date;
      // }
    }
  }


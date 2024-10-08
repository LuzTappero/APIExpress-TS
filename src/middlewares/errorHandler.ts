import { Request, Response, NextFunction } from "express";

interface ErrorMessages {
  [key: string]: { status: number; message: string };
}

const errorMessages: ErrorMessages = {
  "User not found": { status: 404, message: "User not found" },
  "Incorrect password": {
    status: 401,
    message: "Incorrect password",
  },

  "ID is required": { status: 400, message: "ID is required" },
  "That username already exists": {
    status: 400,
    message: "That username already exists",
  },
  "Email is required": { status: 400, message: "Email is required" },
  "That email already exists": {
    status: 409,
    message: "That email already exists",
  },
  "Error logging out": {
    status: 500,
    message: "Error logging out",
  },

  Unauthorized: {
    status: 401,
    message: "Unauthorized",
  },

  "Product not found": {
    status: 404,
    message: "Product not found",
  },

  "Invalid credentials": {
    status: 401,
    message: "Invalid credentials",
  },
};

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err instanceof Error ? err.stack : "Unknown error");

  if (err && typeof err === "object" && "errors" in err) {
    const validationErrors = (err as { errors: Array<{ msg: string }> }).errors;
    res
      .status(400)
      .json({ message: "Validation failed", errors: validationErrors });
    return;
  }

  const errorMessage =
    err instanceof Error ? err.message : "Internal Server Error";
  const errorResponse = errorMessages[errorMessage] || {
    status: 500,
    message: "Internal Server Error",
  };
  res.status(errorResponse.status).json({ message: errorResponse.message });
};

export default errorHandler;

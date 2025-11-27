import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = {}) => {
  return NextResponse.json({
    success,
    statusCode,
    message,
    data,
  }, { status: statusCode });
};


export const catchError = (error, customMessage) => {
  // Handle duplicate key error (Mongo error 11000)
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern).join(', ');
    error.message = `Duplicate field: ${keys}. This must be unique.`;
  }

  let errorObj = {};

  if (process.env.NODE_ENV === "development") {
    errorObj = {
      message: error.message,
      stack: error.stack,
      error,
    };
  } else {
    errorObj = {
      message: customMessage || "Internal server error.",
    };
  }

  return response(false, 500, errorObj.message, errorObj);
};

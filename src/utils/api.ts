import express from "express";

export interface BoardmanRequest<T> extends express.Request {
  body: T;
}

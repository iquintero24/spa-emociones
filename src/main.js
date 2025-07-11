
import './style.css'

import { renderRouter } from "./route.js";

window.addEventListener("DOMContentLoaded", renderRouter);
window.addEventListener("hashchange", renderRouter);
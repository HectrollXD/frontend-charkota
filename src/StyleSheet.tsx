//-------------------------------------------------------------------------------------------------- Imports
import React from "react";



//-------------------------------------------------------------------------------------------------- Types
type CSSProperties = {
  [key:string]: React.CSSProperties;
};



//-------------------------------------------------------------------------------------------------- Class
class StyleSheet {
  static create<Styles extends CSSProperties>(styles: Styles): Styles {
    return styles;
  };
};



//-------------------------------------------------------------------------------------------------- Exports
export default StyleSheet;

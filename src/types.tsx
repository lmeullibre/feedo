export interface Reaction {
    ad_id: string;
    ad_agency_id: string;
    ad_timestamp: number;
    value: Expression;
  }
  
  export interface Expression {
    value: string;
    probability: number;
    sentiments: {
      angry: number;
      disgust: number;
      fear: number;
      happy: number;
      sad: number;
      surprise: number;
      neutral: number;
    };
  }
  
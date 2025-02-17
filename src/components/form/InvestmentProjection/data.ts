export interface InvestmentProjectionData {
  key: string | number;
  year: number;
  saved: number;
  invested: number;
  'I+S': number;
}

export const data: InvestmentProjectionData[] = [
  { key: 1, year: 1999, saved: 5000, invested: 5000, 'I+S': 5000 },
  { key: 2, year: 2000, saved: 5000, invested: 4508, 'I+S': 4598 },
  { key: 3, year: 2001, saved: 5100, invested: 3964, 'I+S': 4131 },
  { key: 4, year: 2002, saved: 5200, invested: 3002, 'I+S': 3205 },
  { key: 5, year: 2003, saved: 5300, invested: 3788, 'I+S': 4170 },
  { key: 6, year: 2004, saved: 5400, invested: 4143, 'I+S': 4670 },
  { key: 7, year: 2005, saved: 5500, invested: 4261, 'I+S': 4906 },
  { key: 8, year: 2006, saved: 5600, invested: 4842, 'I+S': 5688 },
  { key: 9, year: 2007, saved: 5700, invested: 5047, 'I+S': 6034 },
  { key: 10, year: 2008, saved: 5800, invested: 3040, 'I+S': 3695 },
  { key: 11, year: 2009, saved: 5900, invested: 3845, 'I+S': 4799 },
  { key: 12, year: 2010, saved: 6000, invested: 4294, 'I+S': 5471 },
  { key: 13, year: 2011, saved: 6100, invested: 4293, 'I+S': 5570 },
  { key: 14, year: 2012, saved: 6200, invested: 4788, 'I+S': 6323 },
  { key: 15, year: 2013, saved: 6300, invested: 6285, 'I+S': 8432 },
  { key: 16, year: 2014, saved: 6400, invested: 7102, 'I+S': 9641 },
  { key: 17, year: 2015, saved: 6500, invested: 7044, 'I+S': 9661 },
  { key: 18, year: 2016, saved: 6600, invested: 7643, 'I+S': 10592 },
  { key: 19, year: 2017, saved: 6700, invested: 9128, 'I+S': 12768 },
  { key: 20, year: 2018, saved: 6800, invested: 8486, 'I+S': 11964 },
  { key: 21, year: 2019, saved: 6900, invested: 10998, 'I+S': 15634 },
  { key: 22, year: 2020, saved: 7000, invested: 12742, 'I+S': 18228 },
  { key: 23, year: 2021, saved: 7100, invested: 16315, 'I+S': 23469 },
  { key: 24, year: 2022, saved: 7200, invested: 13108, 'I+S': 18937 },
  { key: 25, year: 2023, saved: 7300, invested: 16285, 'I+S': 23649 },
  { key: 26, year: 2024, saved: 7400, invested: 20168, 'I+S': 29412 },
];

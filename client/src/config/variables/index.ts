export interface BannedReason {
  code: string;
  vi: string;
  en: string;
}
const BannedReasons: BannedReason[] = [
  {
    code: 'hate-speech',
    vi: 'Ngôn ngữ không đúng mực',
    en: 'Inappropriate speech',
  },
  { code: 'miss-info', vi: 'Thông tin sai lệch', en: 'Missed Information' },
  {
    code: 'harass',
    vi: 'Hành vi quấy rối hoặc bắt nạt',
    en: 'Harassment/ Bullying behavior',
  },
  {
    code: 'spam',
    vi: 'Spam hoặc quảng cáo',
    en: 'Spams/ Advertisement content',
  },
];

export default BannedReasons;

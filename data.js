/* ── Appointment Setter Demo — Data ── */

const REPS = [
  { id: 'r1', name: 'Sarah Chen', avatar: 'SC', booked: 34, conversion: 28, active: 12 },
  { id: 'r2', name: 'Marcus Rivera', avatar: 'MR', booked: 29, conversion: 24, active: 9 },
  { id: 'r3', name: 'Priya Patel', avatar: 'PP', booked: 41, conversion: 32, active: 15 },
  { id: 'r4', name: 'James OBrien', avatar: 'JO', booked: 22, conversion: 18, active: 7 },
];

const CAMPAIGNS = [
  {
    id: 'c1', name: 'Q2 SaaS Outreach', status: 'active', channel: 'Email + SMS',
    totalLeads: 1240, contacted: 876, engaged: 312, booked: 89, converted: 41,
    startDate: '2026-03-15', rep: 'r3',
    conversionRate: 10.2, responseRate: 35.6, bookingRate: 28.5,
  },
  {
    id: 'c2', name: 'Enterprise Demo Blitz', status: 'active', channel: 'Phone + Email',
    totalLeads: 420, contacted: 310, engaged: 145, booked: 62, converted: 28,
    startDate: '2026-04-01', rep: 'r1',
    conversionRate: 19.4, responseRate: 46.8, bookingRate: 42.8,
  },
  {
    id: 'c3', name: 'Mid-Market Re-engagement', status: 'active', channel: 'Email',
    totalLeads: 680, contacted: 540, engaged: 198, booked: 54, converted: 19,
    startDate: '2026-03-28', rep: 'r2',
    conversionRate: 9.6, responseRate: 36.7, bookingRate: 27.3,
  },
  {
    id: 'c4', name: 'Startup Growth Pack', status: 'paused', channel: 'SMS + LinkedIn',
    totalLeads: 350, contacted: 220, engaged: 78, booked: 18, converted: 7,
    startDate: '2026-02-10', rep: 'r4',
    conversionRate: 8.2, responseRate: 35.5, bookingRate: 23.1,
  },
  {
    id: 'c5', name: 'Healthcare Vertical Push', status: 'completed', channel: 'Phone + Email',
    totalLeads: 560, contacted: 560, engaged: 245, booked: 102, converted: 58,
    startDate: '2026-01-05', rep: 'r3',
    conversionRate: 23.6, responseRate: 43.8, bookingRate: 41.6,
  },
];

const LEAD_STATUSES = ['new', 'contacted', 'engaged', 'meeting-set', 'booked', 'no-show', 'converted', 'lost'];

const LEADS = [
  { id: 'l1', name: 'David Kim', company: 'TechForge Inc.', title: 'VP of Sales', status: 'booked', campaign: 'c2', rep: 'r1', score: 92, lastTouch: '2 hours ago', callTime: 'Apr 18, 2:00 PM', channel: 'email' },
  { id: 'l2', name: 'Rachel Torres', company: 'Meridian Health', title: 'Dir. of Operations', status: 'engaged', campaign: 'c1', rep: 'r3', score: 78, lastTouch: '45 min ago', callTime: null, channel: 'sms' },
  { id: 'l3', name: 'Alex Petrov', company: 'NovaBuild', title: 'CTO', status: 'meeting-set', campaign: 'c2', rep: 'r1', score: 85, lastTouch: '1 hour ago', callTime: 'Apr 17, 4:30 PM', channel: 'phone' },
  { id: 'l4', name: 'Jennifer Walsh', company: 'SummitPeak Advisory', title: 'Managing Partner', status: 'contacted', campaign: 'c3', rep: 'r2', score: 45, lastTouch: '3 hours ago', callTime: null, channel: 'email' },
  { id: 'l5', name: 'Omar Hassan', company: 'CloudBridge SaaS', title: 'Head of Growth', status: 'converted', campaign: 'c5', rep: 'r3', score: 96, lastTouch: '1 day ago', callTime: 'Apr 14, 10:00 AM', channel: 'email' },
  { id: 'l6', name: 'Sophie Laurent', company: 'Apex Dynamics', title: 'CEO', status: 'booked', campaign: 'c1', rep: 'r3', score: 88, lastTouch: '30 min ago', callTime: 'Apr 19, 11:00 AM', channel: 'sms' },
  { id: 'l7', name: 'Brian Nakamura', company: 'FinEdge Capital', title: 'VP Engineering', status: 'no-show', campaign: 'c2', rep: 'r1', score: 64, lastTouch: '5 hours ago', callTime: 'Apr 16, 3:00 PM', channel: 'phone' },
  { id: 'l8', name: 'Lisa Chang', company: 'GreenPath Labs', title: 'COO', status: 'new', campaign: 'c3', rep: 'r2', score: 32, lastTouch: 'Not yet', callTime: null, channel: 'email' },
  { id: 'l9', name: 'Carlos Mendez', company: 'Velocity Motors', title: 'Dir. of Sales', status: 'engaged', campaign: 'c4', rep: 'r4', score: 71, lastTouch: '2 hours ago', callTime: null, channel: 'linkedin' },
  { id: 'l10', name: 'Nina Johansson', company: 'Arctic Cloud AB', title: 'CMO', status: 'lost', campaign: 'c1', rep: 'r3', score: 28, lastTouch: '2 days ago', callTime: null, channel: 'email' },
  { id: 'l11', name: 'Tyler Reed', company: 'StackPivot', title: 'Founder', status: 'booked', campaign: 'c3', rep: 'r2', score: 82, lastTouch: '1 hour ago', callTime: 'Apr 20, 9:30 AM', channel: 'sms' },
  { id: 'l12', name: 'Maya Singh', company: 'BrightWave Media', title: 'Head of Partnerships', status: 'meeting-set', campaign: 'c1', rep: 'r3', score: 76, lastTouch: '20 min ago', callTime: 'Apr 17, 5:00 PM', channel: 'email' },
];

const CONVERSATIONS = {
  l1: {
    lead: 'David Kim',
    aiHandled: true,
    messages: [
      { from: 'ai', text: 'Hi David, I noticed TechForge recently expanded your sales team. We help scaling teams book 3x more qualified demos with AI-powered outreach. Would a quick 20-minute overview be useful?', time: '10:14 AM' },
      { from: 'lead', text: 'Interesting timing. We are actually looking at tools to help with outbound. What does your platform do exactly?', time: '10:32 AM' },
      { from: 'ai', text: 'Great question! We automate the initial outreach and qualification, then hand off warm leads to your reps with full context. Most teams see a 40% increase in booked meetings within 30 days. I can set up a personalized walkthrough with one of our solution consultants. Does tomorrow at 2 PM work?', time: '10:33 AM' },
      { from: 'lead', text: 'Tomorrow at 2 works. Send me a calendar invite.', time: '10:41 AM' },
      { from: 'ai', text: 'Done! You will receive a calendar invite shortly for April 18 at 2:00 PM. Looking forward to showing you what we can do for TechForge. Talk soon, David!', time: '10:42 AM' },
    ],
    outcome: 'booked',
    sentiment: 'positive',
  },
  l2: {
    lead: 'Rachel Torres',
    aiHandled: true,
    messages: [
      { from: 'ai', text: 'Hi Rachel, Meridian Health caught my eye since you recently posted about scaling your operations team. We work with several healthcare orgs to streamline appointment scheduling and reduce no-shows. Mind if I share a quick case study?', time: '2:05 PM' },
      { from: 'lead', text: 'Sure send it over', time: '2:18 PM' },
      { from: 'ai', text: 'Here is a link to how we helped CareFirst reduce no-shows by 35%: [case study]. Would it make sense to hop on a 15-minute call to explore fit? I have availability Thursday or Friday.', time: '2:19 PM' },
      { from: 'lead', text: 'Let me check with my team first and get back to you', time: '2:45 PM' },
      { from: 'ai', text: 'Absolutely! No rush. I will follow up Thursday if I dont hear back. Have a great rest of your day, Rachel.', time: '2:46 PM' },
    ],
    outcome: 'follow-up',
    sentiment: 'warm',
  },
  l3: {
    lead: 'Alex Petrov',
    aiHandled: false,
    messages: [
      { from: 'ai', text: 'Hi Alex, I see NovaBuild just closed a Series B. Congrats! We help fast-growing tech companies automate their outbound pipeline. Would you be open to a brief chat?', time: '9:00 AM' },
      { from: 'lead', text: 'We are actually evaluating tools right now. Can you have someone call me this afternoon?', time: '9:12 AM' },
      { from: 'ai', text: '[Escalated to rep] Great to hear, Alex! Let me connect you directly with Sarah Chen, our solutions consultant. She will reach out today.', time: '9:13 AM' },
      { from: 'rep', text: 'Hi Alex, Sarah here from the team. I would love to walk you through what we can do for NovaBuild. Does 4:30 PM today work for a quick call?', time: '9:45 AM' },
      { from: 'lead', text: 'Perfect. 4:30 works.', time: '9:52 AM' },
      { from: 'rep', text: 'Awesome, sending the invite now. Talk soon!', time: '9:53 AM' },
    ],
    outcome: 'booked',
    sentiment: 'positive',
  },
  l7: {
    lead: 'Brian Nakamura',
    aiHandled: true,
    messages: [
      { from: 'ai', text: 'Hi Brian, I noticed FinEdge Capital has been growing their engineering team. We help tech-forward financial firms optimize their client acquisition pipeline. Would a quick demo be worth 15 minutes?', time: '11:00 AM' },
      { from: 'lead', text: 'Sure, can we do Wednesday at 3?', time: '11:24 AM' },
      { from: 'ai', text: 'Wednesday at 3 PM it is! Sending your calendar invite now. See you then, Brian!', time: '11:25 AM' },
      { from: 'system', text: 'Lead did not join scheduled call. Auto-follow-up triggered.', time: '3:15 PM' },
      { from: 'ai', text: 'Hi Brian, looks like we missed each other earlier. No worries! Would you like to reschedule? I have openings tomorrow morning or Friday afternoon.', time: '3:16 PM' },
    ],
    outcome: 'no-show',
    sentiment: 'neutral',
  },
  l6: {
    lead: 'Sophie Laurent',
    aiHandled: true,
    messages: [
      { from: 'ai', text: 'Hi Sophie, Apex Dynamics is doing impressive work in the manufacturing automation space. We help companies like yours book more qualified sales meetings with AI-driven outreach. Would you be open to a quick conversation?', time: '3:30 PM' },
      { from: 'lead', text: 'What kind of results do your clients typically see?', time: '3:42 PM' },
      { from: 'ai', text: 'Great question! On average, our clients see a 45% increase in booked meetings and a 60% reduction in time-to-first-contact. For manufacturing, we have seen even stronger results due to longer sales cycles benefiting from persistent, personalized outreach.', time: '3:43 PM' },
      { from: 'lead', text: 'Those numbers are solid. Yes let us set something up. I am free Saturday morning.', time: '4:01 PM' },
      { from: 'ai', text: 'How about April 19 at 11:00 AM? I will send over a calendar invite with a brief agenda so you know exactly what to expect. Looking forward to it, Sophie!', time: '4:02 PM' },
      { from: 'lead', text: 'Works for me.', time: '4:05 PM' },
    ],
    outcome: 'booked',
    sentiment: 'positive',
  },
  l10: {
    lead: 'Nina Johansson',
    aiHandled: true,
    messages: [
      { from: 'ai', text: 'Hi Nina, Arctic Cloud AB has been making waves in the Nordic SaaS market. We help growing companies automate outbound appointment setting to accelerate pipeline. Would a brief call make sense?', time: '8:30 AM' },
      { from: 'lead', text: 'Not really interested. We handle everything in-house.', time: '9:15 AM' },
      { from: 'ai', text: 'Totally understand, Nina. If anything changes in the future, feel free to reach out. Wishing you and the Arctic Cloud team continued success!', time: '9:16 AM' },
    ],
    outcome: 'lost',
    sentiment: 'cold',
  },
};

const BOOKED_CALLS = [
  { lead: 'David Kim', company: 'TechForge Inc.', time: 'Apr 18, 2:00 PM', rep: 'Sarah Chen', status: 'upcoming', campaign: 'Enterprise Demo Blitz' },
  { lead: 'Alex Petrov', company: 'NovaBuild', time: 'Apr 17, 4:30 PM', rep: 'Sarah Chen', status: 'today', campaign: 'Enterprise Demo Blitz' },
  { lead: 'Sophie Laurent', company: 'Apex Dynamics', time: 'Apr 19, 11:00 AM', rep: 'Priya Patel', status: 'upcoming', campaign: 'Q2 SaaS Outreach' },
  { lead: 'Tyler Reed', company: 'StackPivot', time: 'Apr 20, 9:30 AM', rep: 'Marcus Rivera', status: 'upcoming', campaign: 'Mid-Market Re-engagement' },
  { lead: 'Maya Singh', company: 'BrightWave Media', time: 'Apr 17, 5:00 PM', rep: 'Priya Patel', status: 'today', campaign: 'Q2 SaaS Outreach' },
  { lead: 'Brian Nakamura', company: 'FinEdge Capital', time: 'Apr 16, 3:00 PM', rep: 'Sarah Chen', status: 'no-show', campaign: 'Enterprise Demo Blitz' },
  { lead: 'Omar Hassan', company: 'CloudBridge SaaS', time: 'Apr 14, 10:00 AM', rep: 'Priya Patel', status: 'completed', campaign: 'Healthcare Vertical Push' },
];

const HOURLY_ACTIVITY = [
  { hour: '8 AM', contacted: 12, responses: 3, booked: 1 },
  { hour: '9 AM', contacted: 28, responses: 9, booked: 3 },
  { hour: '10 AM', contacted: 45, responses: 16, booked: 5 },
  { hour: '11 AM', contacted: 38, responses: 14, booked: 4 },
  { hour: '12 PM', contacted: 22, responses: 7, booked: 2 },
  { hour: '1 PM', contacted: 35, responses: 12, booked: 4 },
  { hour: '2 PM', contacted: 52, responses: 19, booked: 7 },
  { hour: '3 PM', contacted: 48, responses: 17, booked: 6 },
  { hour: '4 PM', contacted: 33, responses: 11, booked: 3 },
  { hour: '5 PM', contacted: 18, responses: 5, booked: 1 },
];

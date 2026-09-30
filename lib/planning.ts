import { DayType, Task } from "./types";

export type PlanningProfile = { workStart?: string | null; workEnd?: string | null; monthlyLearningHours?: number | null; weeklyContentTarget?: number | null };

export function dayType(date = new Date()): DayType {
  const d = date.getDay();
  if (d >= 1 && d <= 3) return "maintenance";
  if (d === 4) return "execution";
  if (d === 5) return "sales";
  if (d === 6) return "life";
  return "review";
}
export function capacityMinutes(type: DayType) { return ({maintenance:120,execution:420,sales:360,life:240,review:300})[type]; }
export function mission(type: DayType) { return ({maintenance:"Protect energy, keep TDO moving, and finish only what matters.",execution:"Create meaningful TDO progress through focused execution.",sales:"Create revenue momentum through focused sales and follow-up.",life:"Build the business without forgetting to build the life around it.",review:"Close the loop: review the week, learn, and prepare the next one."})[type]; }
export function priority(t: Task, today = new Date()) {
  let score = Math.max(0,Number(t.revenueImpact||0))*4 + Math.max(0,Number(t.strategicImpact||0))*3 + Number(t.importance||0)*3 + Number(t.urgency||0)*3 + (t.urgent?18:0);
  if(t.due){const days=(new Date(t.due).getTime()-today.getTime())/86400000;if(days<0)score+=42;else if(days<=1)score+=30;else if(days<=3)score+=18;else if(days<=7)score+=8;}
  return score-Math.min(Number(t.estimatedMinutes||30)/20,15);
}
export function availableCapacity(type:DayType,profile:PlanningProfile,calendarMinutes=0,healthPenalty=0){
  const base=capacityMinutes(type);
  const configured=profile.workStart&&profile.workEnd?Math.max(0,Number(profile.workEnd.slice(0,2))-Number(profile.workStart.slice(0,2)))*60:base;
  return Math.max(60,Math.min(base,configured)-calendarMinutes-healthPenalty);
}
export function dailyScore(input:{completedTasks:number;plannedTasks:number;highImpactCompleted:number;highImpactPlanned:number;revenueActions:number;revenueTargetActions:number;health?:any;learningMinutes:number;learningTargetMinutes:number;lifeActions:number}){
  const execution=input.plannedTasks?Math.round(Math.min(1,input.completedTasks/input.plannedTasks)*25):0;
  const impact=input.highImpactPlanned?Math.round(Math.min(1,input.highImpactCompleted/input.highImpactPlanned)*15):0;
  const business=input.revenueTargetActions?Math.round(Math.min(1,input.revenueActions/input.revenueTargetActions)*20):0;
  const h=input.health; const health=h?Math.round((Number(h.sleep_hours||0)>=7?7:Number(h.sleep_hours||0)/7*7)+(Number(h.energy||0)/10*6)+(Number(h.recovery||0)/10*7)):0;
  const learning=input.learningTargetMinutes?Math.round(Math.min(1,input.learningMinutes/input.learningTargetMinutes)*10):0;
  const life=Math.min(10,input.lifeActions*5);
  return {score:Math.min(100,execution+impact+business+health+learning+life),breakdown:{execution:execution+impact,business,health,learning,life}};
}
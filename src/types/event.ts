export type EventPresenter = {
  name: string;
  role: 'presenter' | 'organizer';
}

export type Event = {
  id: number;
  title: string;
  type: string;
  goal: string;
  date: string;
  time: string;
  location: string;
  presenters: EventPresenter[];
  attendees: number;
}

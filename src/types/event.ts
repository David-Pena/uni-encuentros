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
  invitationLink?: string; // Add this
  participants: Array<{
    email: string;
    name?: string;
    role: 'attendee' | 'presenter' | 'organizer';
    status: 'pending' | 'accepted' | 'declined';
  }>;
  logo?: string;  // Add this line to your Event type
}

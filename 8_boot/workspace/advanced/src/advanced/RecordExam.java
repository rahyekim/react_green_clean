package advanced;

public class RecordExam {

	public static void main(String[] args) {
		
		Mem member1= new Mem("id123", "황현진", 22);

		System.out.println(member1.id());
		System.out.println(member1.name());
		System.out.println(member1.age());
		System.out.println(member1.toString());
		System.out.println(member1);
		System.err.println();
		
		Mem member2= new Mem("id123", "황현진", 22);

		System.out.println("m1과 m2비교" + member1.equals(member2));
		System.out.println("m1해시코드: " + member1.hashCode());
		System.out.println("m2해시코드: " + member2.hashCode());

	}

}
